import { Request, Response } from 'express';
import { patientService } from '../services/patient.service.js';
import { ApiResponse } from '../types/api.types.js';
import { logger } from '../utils/logger.js';

export const patientController = {
  /**
   * Get patient profile
   * GET /api/patients/profile
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

      const patient = await patientService.getProfile(req.patientId);

      res.status(200).json({
        success: true,
        data: patient,
      } as ApiResponse<typeof patient>);
    } catch (error) {
      logger.error('Get profile error:', error);

      if (error instanceof Error && error.message === 'Patient not found') {
        res.status(404).json({
          success: false,
          error: error.message,
        } as ApiResponse<null>);
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Failed to get profile',
      } as ApiResponse<null>);
    }
  },

  /**
   * Update patient profile
   * PUT /api/patients/profile
   */
  updateProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      const patient = await patientService.updateProfile(req.patientId, req.body);

      res.status(200).json({
        success: true,
        data: patient,
        message: 'Profile updated successfully',
      } as ApiResponse<typeof patient>);
    } catch (error) {
      logger.error('Update profile error:', error);

      if (error instanceof Error && error.message === 'Patient not found') {
        res.status(404).json({
          success: false,
          error: error.message,
        } as ApiResponse<null>);
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Failed to update profile',
      } as ApiResponse<null>);
    }
  },

  /**
   * Change password
   * POST /api/patients/change-password
   */
  changePassword: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      const result = await patientService.changePassword(req.patientId, req.body);

      res.status(200).json({
        success: true,
        data: result,
        message: 'Password changed successfully',
      } as ApiResponse<typeof result>);
    } catch (error) {
      logger.error('Change password error:', error);

      if (error instanceof Error && error.message === 'Current password is incorrect') {
        res.status(400).json({
          success: false,
          error: error.message,
        } as ApiResponse<null>);
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Failed to change password',
      } as ApiResponse<null>);
    }
  },

  /**
   * Get all documents
   * GET /api/patients/documents
   */
  getDocuments: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      const documents = await patientService.getDocuments(req.patientId);

      res.status(200).json({
        success: true,
        data: documents,
      } as ApiResponse<typeof documents>);
    } catch (error) {
      logger.error('Get documents error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch documents',
      } as ApiResponse<null>);
    }
  },

  /**
   * Get document by ID
   * GET /api/patients/documents/:id
   */
  getDocumentById: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      const { id } = req.params;
      const document = await patientService.getDocumentById(id, req.patientId);

      res.status(200).json({
        success: true,
        data: document,
      } as ApiResponse<typeof document>);
    } catch (error) {
      logger.error('Get document by ID error:', error);

      if (error instanceof Error && error.message === 'Document not found') {
        res.status(404).json({
          success: false,
          error: error.message,
        } as ApiResponse<null>);
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Failed to fetch document',
      } as ApiResponse<null>);
    }
  },

  /**
   * Upload document
   * POST /api/patients/documents
   */
  uploadDocument: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      if (!req.file) {
        res.status(400).json({
          success: false,
          error: 'No file uploaded',
        } as ApiResponse<null>);
        return;
      }

      // In a real application, you would upload to S3, Cloudinary, etc.
      // For now, we'll use a simple file URL
      const fileUrl = `/uploads/${req.file.filename}`;

      const document = await patientService.uploadDocument(
        req.patientId,
        req.file,
        fileUrl
      );

      res.status(201).json({
        success: true,
        data: document,
        message: 'Document uploaded successfully',
      } as ApiResponse<typeof document>);
    } catch (error) {
      logger.error('Upload document error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to upload document',
      } as ApiResponse<null>);
    }
  },

  /**
   * Delete document
   * DELETE /api/patients/documents/:id
   */
  deleteDocument: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      const { id } = req.params;
      const result = await patientService.deleteDocument(id, req.patientId);

      res.status(200).json({
        success: true,
        data: result,
        message: 'Document deleted successfully',
      } as ApiResponse<typeof result>);
    } catch (error) {
      logger.error('Delete document error:', error);

      if (error instanceof Error && error.message === 'Document not found') {
        res.status(404).json({
          success: false,
          error: error.message,
        } as ApiResponse<null>);
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Failed to delete document',
      } as ApiResponse<null>);
    }
  },

  /**
   * Get patient statistics
   * GET /api/patients/statistics
   */
  getStatistics: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.patientId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        } as ApiResponse<null>);
        return;
      }

      const statistics = await patientService.getStatistics(req.patientId);

      res.status(200).json({
        success: true,
        data: statistics,
      } as ApiResponse<typeof statistics>);
    } catch (error) {
      logger.error('Get statistics error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get statistics',
      } as ApiResponse<null>);
    }
  },
};

