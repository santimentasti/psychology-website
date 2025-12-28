import { prisma } from '../config/database.js';
import { CreateAppointmentInput, UpdateAppointmentInput, GetAppointmentsQuery } from '../schemas/appointment.schema.js';
import { AppointmentStatus } from '../../../shared/types/appointment.types.js';
import { logger } from '../utils/logger.js';

export const appointmentService = {
  /**
   * Get all appointments for a patient
   */
  getAll: async (patientId: string, query?: GetAppointmentsQuery) => {
    const where: any = { patientId };

    if (query?.status) {
      where.status = query.status;
    }

    if (query?.serviceId) {
      where.serviceId = query.serviceId;
    }

    if (query?.startDate || query?.endDate) {
      where.dateTime = {};
      if (query.startDate) {
        where.dateTime.gte = new Date(query.startDate);
      }
      if (query.endDate) {
        where.dateTime.lte = new Date(query.endDate);
      }
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            duration: true,
            priceUSD: true,
            priceEUR: true,
            priceARS: true,
            priceMXN: true,
          },
        },
      },
      orderBy: {
        dateTime: 'asc',
      },
    });

    return appointments;
  },

  /**
   * Get an appointment by ID
   */
  getById: async (id: string, patientId: string) => {
    const appointment = await prisma.appointment.findFirst({
      where: {
        id,
        patientId, // Ensure patient can only access their own appointments
      },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            duration: true,
            priceUSD: true,
            priceEUR: true,
            priceARS: true,
            priceMXN: true,
          },
        },
        payment: {
          select: {
            id: true,
            status: true,
            amount: true,
            currency: true,
            paymentMethod: true,
          },
        },
      },
    });

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    return appointment;
  },

  /**
   * Check if a time slot is available
   */
  checkAvailability: async (dateTime: Date, serviceId: string, excludeAppointmentId?: string) => {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new Error('Service not found');
    }

    if (!service.isActive) {
      throw new Error('Service is not active');
    }

    // Calculate end time
    const endTime = new Date(dateTime);
    endTime.setMinutes(endTime.getMinutes() + service.duration);

    // Check for overlapping appointments
    const where: any = {
      serviceId,
      status: {
        in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED],
      },
      OR: [
        {
          // Appointment starts during the requested time
          dateTime: {
            gte: dateTime,
            lt: endTime,
          },
        },
        {
          // Appointment ends during the requested time
          AND: [
            {
              dateTime: { lt: dateTime },
            },
            {
              // Calculate appointment end time
              // We need to get the service duration for existing appointments
            },
          ],
        },
      ],
    };

    if (excludeAppointmentId) {
      where.id = { not: excludeAppointmentId };
    }

    // Get all conflicting appointments with their services to calculate end times
    const conflictingAppointments = await prisma.appointment.findMany({
      where: {
        serviceId,
        status: {
          in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED],
        },
        id: excludeAppointmentId ? { not: excludeAppointmentId } : undefined,
      },
      include: {
        service: true,
      },
    });

    // Check for actual time conflicts
    const hasConflict = conflictingAppointments.some((appointment) => {
      const appStart = new Date(appointment.dateTime);
      const appEnd = new Date(appStart);
      appEnd.setMinutes(appEnd.getMinutes() + appointment.service.duration);

      // Check if there's any overlap
      return (
        (dateTime >= appStart && dateTime < appEnd) ||
        (endTime > appStart && endTime <= appEnd) ||
        (dateTime <= appStart && endTime >= appEnd)
      );
    });

    if (hasConflict) {
      throw new Error('Time slot is not available');
    }

    return true;
  },

  /**
   * Create a new appointment
   */
  create: async (patientId: string, data: CreateAppointmentInput) => {
    // Check if service exists and is active
    const service = await prisma.service.findUnique({
      where: { id: data.serviceId },
    });

    if (!service) {
      throw new Error('Service not found');
    }

    if (!service.isActive) {
      throw new Error('Service is not active');
    }

    // Check availability
    await appointmentService.checkAvailability(data.dateTime, data.serviceId);

    // Check if date is in the past
    if (data.dateTime < new Date()) {
      throw new Error('Cannot create appointment in the past');
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        serviceId: data.serviceId,
        dateTime: data.dateTime,
        notes: data.notes,
        status: AppointmentStatus.PENDING,
      },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            duration: true,
            priceUSD: true,
            priceEUR: true,
            priceARS: true,
            priceMXN: true,
          },
        },
      },
    });

    logger.info(`Appointment created: ${appointment.id} for patient ${patientId}`);

    return appointment;
  },

  /**
   * Update an appointment
   */
  update: async (id: string, patientId: string, data: UpdateAppointmentInput) => {
    // Check if appointment exists and belongs to patient
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        id,
        patientId,
      },
    });

    if (!existingAppointment) {
      throw new Error('Appointment not found');
    }

    // If updating dateTime, check availability
    if (data.dateTime) {
      // Check if date is in the past
      if (data.dateTime < new Date()) {
        throw new Error('Cannot reschedule appointment to the past');
      }

      // Check availability (excluding current appointment)
      await appointmentService.checkAvailability(data.dateTime, existingAppointment.serviceId, id);
    }

    // If cancelling, validate
    if (data.status === AppointmentStatus.CANCELLED) {
      // Can only cancel if not already completed or cancelled
      if (
        existingAppointment.status === AppointmentStatus.COMPLETED ||
        existingAppointment.status === AppointmentStatus.CANCELLED
      ) {
        throw new Error('Cannot cancel a completed or already cancelled appointment');
      }
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        ...(data.dateTime && { dateTime: data.dateTime }),
        ...(data.status && { status: data.status }),
        ...(data.notes !== undefined && { notes: data.notes }),
      },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            duration: true,
            priceUSD: true,
            priceEUR: true,
            priceARS: true,
            priceMXN: true,
          },
        },
      },
    });

    logger.info(`Appointment updated: ${appointment.id}`);

    return appointment;
  },

  /**
   * Cancel an appointment
   */
  cancel: async (id: string, patientId: string) => {
    const appointment = await appointmentService.getById(id, patientId);

    if (appointment.status === AppointmentStatus.COMPLETED) {
      throw new Error('Cannot cancel a completed appointment');
    }

    if (appointment.status === AppointmentStatus.CANCELLED) {
      throw new Error('Appointment is already cancelled');
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: { status: AppointmentStatus.CANCELLED },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            duration: true,
          },
        },
      },
    });

    logger.info(`Appointment cancelled: ${appointment.id}`);

    return updatedAppointment;
  },

  /**
   * Get available time slots for a date
   */
  getAvailableSlots: async (date: Date, serviceId: string) => {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new Error('Service not found');
    }

    if (!service.isActive) {
      throw new Error('Service is not active');
    }

    // Get available slots from database
    const dayOfWeek = date.getDay();
    const availableSlots = await prisma.availableSlot.findMany({
      where: {
        dayOfWeek,
        isActive: true,
      },
    });

    // Get booked appointments for that day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookedAppointments = await prisma.appointment.findMany({
      where: {
        serviceId,
        dateTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED],
        },
      },
    });

    // Generate available time slots
    const slots: { time: string; available: boolean }[] = [];

    for (const slot of availableSlots) {
      const [startHour, startMinute] = slot.startTime.split(':').map(Number);
      const [endHour, endMinute] = slot.endTime.split(':').map(Number);

      const slotStart = new Date(date);
      slotStart.setHours(startHour, startMinute, 0, 0);

      const slotEnd = new Date(date);
      slotEnd.setHours(endHour, endMinute, 0, 0);

      // Generate slots based on service duration
      let currentTime = new Date(slotStart);

      while (currentTime.getTime() + service.duration * 60000 <= slotEnd.getTime()) {
        const timeString = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
        
        // Check if this time slot conflicts with any booked appointment
        const isBooked = bookedAppointments.some((appointment) => {
          const appStart = new Date(appointment.dateTime);
          const appEnd = new Date(appStart);
          appEnd.setMinutes(appEnd.getMinutes() + service.duration);

          const slotEndTime = new Date(currentTime);
          slotEndTime.setMinutes(slotEndTime.getMinutes() + service.duration);

          return (
            (currentTime >= appStart && currentTime < appEnd) ||
            (slotEndTime > appStart && slotEndTime <= appEnd) ||
            (currentTime <= appStart && slotEndTime >= appEnd)
          );
        });

        slots.push({
          time: timeString,
          available: !isBooked && currentTime > new Date(), // Also check if time is in the past
        });

        // Move to next slot (assuming 30-minute intervals, adjust as needed)
        currentTime.setMinutes(currentTime.getMinutes() + 30);
      }
    }

    return slots;
  },
};

