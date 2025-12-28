import { prisma } from '../config/database.js';
import { CreateServiceInput, UpdateServiceInput } from '../schemas/service.schema.js';
import { logger } from '../utils/logger.js';

export const serviceService = {
  /**
   * Get all services (optionally filter by active status)
   */
  getAll: async (includeInactive: boolean = false) => {
    const where = includeInactive ? {} : { isActive: true };

    const services = await prisma.service.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return services;
  },

  /**
   * Get a service by ID
   */
  getById: async (id: string) => {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new Error('Service not found');
    }

    return service;
  },

  /**
   * Create a new service
   */
  create: async (data: CreateServiceInput) => {
    const service = await prisma.service.create({
      data: {
        name: data.name,
        description: data.description,
        duration: data.duration,
        priceUSD: data.priceUSD,
        priceEUR: data.priceEUR,
        priceARS: data.priceARS,
        priceMXN: data.priceMXN,
        isActive: true,
      },
    });

    logger.info(`Service created: ${service.name} (${service.id})`);

    return service;
  },

  /**
   * Update a service
   */
  update: async (id: string, data: UpdateServiceInput) => {
    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      throw new Error('Service not found');
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description && { description: data.description }),
        ...(data.duration && { duration: data.duration }),
        ...(data.priceUSD !== undefined && { priceUSD: data.priceUSD }),
        ...(data.priceEUR !== undefined && { priceEUR: data.priceEUR }),
        ...(data.priceARS !== undefined && { priceARS: data.priceARS }),
        ...(data.priceMXN !== undefined && { priceMXN: data.priceMXN }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    });

    logger.info(`Service updated: ${service.name} (${service.id})`);

    return service;
  },

  /**
   * Delete a service (soft delete by setting isActive to false)
   */
  delete: async (id: string) => {
    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      throw new Error('Service not found');
    }

    // Check if service has active appointments
    const activeAppointments = await prisma.appointment.count({
      where: {
        serviceId: id,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    if (activeAppointments > 0) {
      throw new Error(
        `Cannot delete service with ${activeAppointments} active appointment(s). Please cancel or complete them first.`
      );
    }

    // Soft delete by setting isActive to false
    const service = await prisma.service.update({
      where: { id },
      data: { isActive: false },
    });

    logger.info(`Service deactivated: ${service.name} (${service.id})`);

    return service;
  },

  /**
   * Hard delete a service (use with caution)
   */
  hardDelete: async (id: string) => {
    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      throw new Error('Service not found');
    }

    // Check if service has any appointments
    const appointmentsCount = await prisma.appointment.count({
      where: { serviceId: id },
    });

    if (appointmentsCount > 0) {
      throw new Error(
        `Cannot delete service with ${appointmentsCount} appointment(s). Please delete appointments first.`
      );
    }

    await prisma.service.delete({
      where: { id },
    });

    logger.info(`Service hard deleted: ${id}`);

    return { message: 'Service deleted successfully' };
  },
};

