import { Request, Response } from 'express';
import { appointmentService } from '../services/appointment.service.js';
import { ApiResponse } from '../types/api.types.js';
import { getAppointmentsQuerySchema } from '../schemas/appointment.schema.js';
import { logger } from '../utils/logger.js';

export const appointmentController = {
  /**
   * Get all appointments for the authenticated patient
   * GET /api/appointments
   */
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      // Parse and validate query parameters
      const query = req.query ? getAppointmentsQuerySchema.parse(req.query) : undefined;
      const appointments = await appointmentService.getAll(req.patientId, query);

      res.status(200).json({
        success: true,
        data: appointments,
      } as ApiResponse<typeof appointments>);
    } catch (error) {
      logger.error('Get all appointments error:', error);
      
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({
          success: false,
          error: 'Invalid query parameters',
        } as ApiResponse<null>);
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Failed to fetch appointments',
      } as ApiResponse<null>);
    }
  },

  /**
   * Get an appointment by ID
   * GET /api/appointments/:id
   */
  getById: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      const { id } = req.params;
      const appointment = await appointmentService.getById(id, req.patientId);

      res.status(200).json({
        success: true,
        data: appointment,
      } as ApiResponse<typeof appointment>);
    } catch (error) {
      logger.error('Get appointment by ID error:', error);

      if (error instanceof Error && error.message === 'Appointment not found') {
        res.status(404).json({
          success: false,
          error: error.message,
        } as ApiResponse<null>);
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Failed to fetch appointment',
      } as ApiResponse<null>);
    }
  },

  /**
   * Create a new appointment
   * POST /api/appointments
   */
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      const appointment = await appointmentService.create(req.patientId, req.body);

      res.status(201).json({
        success: true,
        data: appointment,
        message: 'Appointment created successfully',
      } as ApiResponse<typeof appointment>);
    } catch (error) {
      logger.error('Create appointment error:', error);

      if (error instanceof Error) {
        if (
          error.message === 'Service not found' ||
          error.message === 'Service is not active' ||
          error.message === 'Time slot is not available' ||
          error.message === 'Cannot create appointment in the past'
        ) {
          res.status(400).json({
            success: false,
            error: error.message,
          } as ApiResponse<null>);
          return;
        }
      }

      res.status(500).json({
        success: false,
        error: 'Failed to create appointment',
      } as ApiResponse<null>);
    }
  },

  /**
   * Update an appointment
   * PUT /api/appointments/:id
   */
  update: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      const { id } = req.params;
      const appointment = await appointmentService.update(id, req.patientId, req.body);

      res.status(200).json({
        success: true,
        data: appointment,
        message: 'Appointment updated successfully',
      } as ApiResponse<typeof appointment>);
    } catch (error) {
      logger.error('Update appointment error:', error);

      if (error instanceof Error) {
        if (error.message === 'Appointment not found') {
          res.status(404).json({
            success: false,
            error: error.message,
          } as ApiResponse<null>);
          return;
        }

        if (
          error.message === 'Time slot is not available' ||
          error.message === 'Cannot reschedule appointment to the past' ||
          error.message === 'Cannot cancel a completed or already cancelled appointment'
        ) {
          res.status(400).json({
            success: false,
            error: error.message,
          } as ApiResponse<null>);
          return;
        }
      }

      res.status(500).json({
        success: false,
        error: 'Failed to update appointment',
      } as ApiResponse<null>);
    }
  },

  /**
   * Cancel an appointment
   * DELETE /api/appointments/:id
   */
  cancel: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      const { id } = req.params;
      const appointment = await appointmentService.cancel(id, req.patientId);

      res.status(200).json({
        success: true,
        data: appointment,
        message: 'Appointment cancelled successfully',
      } as ApiResponse<typeof appointment>);
    } catch (error) {
      logger.error('Cancel appointment error:', error);

      if (error instanceof Error) {
        if (error.message === 'Appointment not found') {
          res.status(404).json({
            success: false,
            error: error.message,
          } as ApiResponse<null>);
          return;
        }

        if (
          error.message === 'Cannot cancel a completed appointment' ||
          error.message === 'Appointment is already cancelled'
        ) {
          res.status(400).json({
            success: false,
            error: error.message,
          } as ApiResponse<null>);
          return;
        }
      }

      res.status(500).json({
        success: false,
        error: 'Failed to cancel appointment',
      } as ApiResponse<null>);
    }
  },

  /**
   * Get available time slots for a date
   * GET /api/appointments/available-slots
   */
  getAvailableSlots: async (req: Request, res: Response): Promise<void> => {
    try {
      const { date, serviceId } = req.query;

      if (!date || !serviceId) {
        res.status(400).json({
          success: false,
          error: 'Date and serviceId are required',
        } as ApiResponse<null>);
        return;
      }

      const slots = await appointmentService.getAvailableSlots(
        new Date(date as string),
        serviceId as string
      );

      res.status(200).json({
        success: true,
        data: slots,
      } as ApiResponse<typeof slots>);
    } catch (error) {
      logger.error('Get available slots error:', error);

      if (error instanceof Error) {
        if (error.message === 'Service not found' || error.message === 'Service is not active') {
          res.status(400).json({
            success: false,
            error: error.message,
          } as ApiResponse<null>);
          return;
        }
      }

      res.status(500).json({
        success: false,
        error: 'Failed to get available slots',
      } as ApiResponse<null>);
    }
  },
};

