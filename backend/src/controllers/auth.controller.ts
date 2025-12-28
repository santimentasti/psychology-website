import { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';
import { ApiResponse } from '../types/api.types.js';
import { logger } from '../utils/logger.js';

export const authController = {
  /**
   * Register a new patient
   * POST /api/auth/register
   */
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await authService.register(req.body);

      res.status(201).json({
        success: true,
        data: result,
        message: 'Patient registered successfully',
      } as ApiResponse<typeof result>);
    } catch (error) {
      logger.error('Registration error:', error);
      
      if (error instanceof Error) {
        if (error.message === 'Email already registered') {
          res.status(409).json({
            success: false,
            error: error.message,
          } as ApiResponse<null>);
          return;
        }
      }

      res.status(500).json({
        success: false,
        error: 'Failed to register patient',
      } as ApiResponse<null>);
    }
  },

  /**
   * Login an existing patient
   * POST /api/auth/login
   */
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await authService.login(req.body);

      res.status(200).json({
        success: true,
        data: result,
        message: 'Login successful',
      } as ApiResponse<typeof result>);
    } catch (error) {
      logger.error('Login error:', error);
      
      if (error instanceof Error) {
        if (error.message === 'Invalid email or password') {
          res.status(401).json({
            success: false,
            error: error.message,
          } as ApiResponse<null>);
          return;
        }
      }

      res.status(500).json({
        success: false,
        error: 'Failed to login',
      } as ApiResponse<null>);
    }
  },

  /**
   * Get current patient profile
   * GET /api/auth/profile
   */
  getProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      const patient = await authService.getProfile(req.patientId);

      res.status(200).json({
        success: true,
        data: patient,
      } as ApiResponse<typeof patient>);
    } catch (error) {
      logger.error('Get profile error:', error);
      
      if (error instanceof Error) {
        if (error.message === 'Patient not found') {
          res.status(404).json({
            success: false,
            error: error.message,
          } as ApiResponse<null>);
          return;
        }
      }

      res.status(500).json({
        success: false,
        error: 'Failed to get profile',
      } as ApiResponse<null>);
    }
  },
};

