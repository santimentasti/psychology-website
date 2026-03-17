import { Request, Response } from 'express';
import { paymentService } from '../services/payment.service.js';
import { ApiResponse } from '../types/api.types.js';
import { logger } from '../utils/logger.js';

export const paymentController = {
  /**
   * Create a payment intent
   * POST /api/payments/create-intent
   */
  createPaymentIntent: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      const result = await paymentService.createPaymentIntent(req.patientId, req.body);

      res.status(201).json({
        success: true,
        data: result,
        message: 'Payment intent created successfully',
      } as ApiResponse<typeof result>);
    } catch (error) {
      logger.error('Create payment intent error:', error);

      if (error instanceof Error) {
        if (
          error.message === 'Service not found' ||
          error.message === 'Service is not active' ||
          error.message === 'Appointment not found' ||
          error.message === 'Appointment already has a completed payment' ||
          error.message === 'Invalid currency'
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
        error: 'Failed to create payment intent',
      } as ApiResponse<null>);
    }
  },

  /**
   * Confirm a payment
   * POST /api/payments/:id/confirm
   */
  confirmPayment: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      const { id } = req.params;
      const payment = await paymentService.confirmPayment(id, req.patientId);

      res.status(200).json({
        success: true,
        data: payment,
        message: 'Payment confirmed successfully',
      } as ApiResponse<typeof payment>);
    } catch (error) {
      logger.error('Confirm payment error:', error);

      if (error instanceof Error) {
        if (
          error.message === 'Payment not found' ||
          error.message === 'Payment already completed' ||
          error.message === 'Payment confirmation failed'
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
        error: 'Failed to confirm payment',
      } as ApiResponse<null>);
    }
  },

  /**
   * Get all payments for authenticated patient
   * GET /api/payments
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

      const payments = await paymentService.getAll(req.patientId);

      res.status(200).json({
        success: true,
        data: payments,
      } as ApiResponse<typeof payments>);
    } catch (error) {
      logger.error('Get all payments error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch payments',
      } as ApiResponse<null>);
    }
  },

  /**
   * Get a payment by ID
   * GET /api/payments/:id
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
      const payment = await paymentService.getById(id, req.patientId);

      res.status(200).json({
        success: true,
        data: payment,
      } as ApiResponse<typeof payment>);
    } catch (error) {
      logger.error('Get payment by ID error:', error);

      if (error instanceof Error && error.message === 'Payment not found') {
        res.status(404).json({
          success: false,
          error: error.message,
        } as ApiResponse<null>);
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Failed to fetch payment',
      } as ApiResponse<null>);
    }
  },
};

