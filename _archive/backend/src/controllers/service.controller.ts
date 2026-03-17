import { Request, Response } from 'express';
import { serviceService } from '../services/service.service.js';
import { ApiResponse } from '../types/api.types.js';
import { logger } from '../utils/logger.js';

export const serviceController = {
  /**
   * Get all services
   * GET /api/services
   */
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const includeInactive = req.query.includeInactive === 'true';
      const services = await serviceService.getAll(includeInactive);

      res.status(200).json({
        success: true,
        data: services,
      } as ApiResponse<typeof services>);
    } catch (error) {
      logger.error('Get all services error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch services',
      } as ApiResponse<null>);
    }
  },

  /**
   * Get a service by ID
   * GET /api/services/:id
   */
  getById: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const service = await serviceService.getById(id);

      res.status(200).json({
        success: true,
        data: service,
      } as ApiResponse<typeof service>);
    } catch (error) {
      logger.error('Get service by ID error:', error);

      if (error instanceof Error && error.message === 'Service not found') {
        res.status(404).json({
          success: false,
          error: error.message,
        } as ApiResponse<null>);
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Failed to fetch service',
      } as ApiResponse<null>);
    }
  },

  /**
   * Create a new service
   * POST /api/services
   */
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const service = await serviceService.create(req.body);

      res.status(201).json({
        success: true,
        data: service,
        message: 'Service created successfully',
      } as ApiResponse<typeof service>);
    } catch (error) {
      logger.error('Create service error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create service',
      } as ApiResponse<null>);
    }
  },

  /**
   * Update a service
   * PUT /api/services/:id
   */
  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const service = await serviceService.update(id, req.body);

      res.status(200).json({
        success: true,
        data: service,
        message: 'Service updated successfully',
      } as ApiResponse<typeof service>);
    } catch (error) {
      logger.error('Update service error:', error);

      if (error instanceof Error && error.message === 'Service not found') {
        res.status(404).json({
          success: false,
          error: error.message,
        } as ApiResponse<null>);
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Failed to update service',
      } as ApiResponse<null>);
    }
  },

  /**
   * Delete a service (soft delete)
   * DELETE /api/services/:id
   */
  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const service = await serviceService.delete(id);

      res.status(200).json({
        success: true,
        data: service,
        message: 'Service deleted successfully',
      } as ApiResponse<typeof service>);
    } catch (error) {
      logger.error('Delete service error:', error);

      if (error instanceof Error) {
        if (error.message === 'Service not found') {
          res.status(404).json({
            success: false,
            error: error.message,
          } as ApiResponse<null>);
          return;
        }

        if (error.message.includes('Cannot delete service')) {
          res.status(400).json({
            success: false,
            error: error.message,
          } as ApiResponse<null>);
          return;
        }
      }

      res.status(500).json({
        success: false,
        error: 'Failed to delete service',
      } as ApiResponse<null>);
    }
  },
};

