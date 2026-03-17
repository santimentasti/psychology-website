import bcrypt from 'bcryptjs';
import { prisma } from '../config/database.js';
import { UpdateProfileInput, ChangePasswordInput } from '../schemas/patient.schema.js';
import { logger } from '../utils/logger.js';

export const patientService = {
  /**
   * Get patient profile
   */
  getProfile: async (patientId: string) => {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        dateOfBirth: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!patient) {
      throw new Error('Patient not found');
    }

    return patient;
  },

  /**
   * Update patient profile
   */
  updateProfile: async (patientId: string, data: UpdateProfileInput) => {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new Error('Patient not found');
    }

    const updatedPatient = await prisma.patient.update({
      where: { id: patientId },
      data: {
        ...(data.firstName && { firstName: data.firstName }),
        ...(data.lastName && { lastName: data.lastName }),
        ...(data.phone && { phone: data.phone }),
        ...(data.dateOfBirth && { dateOfBirth: data.dateOfBirth }),
        ...(data.address !== undefined && { address: data.address }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        dateOfBirth: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    logger.info(`Patient profile updated: ${patientId}`);

    return updatedPatient;
  },

  /**
   * Change patient password
   */
  changePassword: async (patientId: string, data: ChangePasswordInput) => {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new Error('Patient not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(data.currentPassword, patient.password);

    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    // Update password
    await prisma.patient.update({
      where: { id: patientId },
      data: { password: hashedPassword },
    });

    logger.info(`Patient password changed: ${patientId}`);

    return { message: 'Password changed successfully' };
  },

  /**
   * Get all documents for a patient
   */
  getDocuments: async (patientId: string) => {
    const documents = await prisma.document.findMany({
      where: { patientId },
      orderBy: {
        uploadedAt: 'desc',
      },
    });

    return documents;
  },

  /**
   * Get a document by ID
   */
  getDocumentById: async (id: string, patientId: string) => {
    const document = await prisma.document.findFirst({
      where: {
        id,
        patientId,
      },
    });

    if (!document) {
      throw new Error('Document not found');
    }

    return document;
  },

  /**
   * Upload a document
   */
  uploadDocument: async (
    patientId: string,
    file: Express.Multer.File,
    fileUrl: string
  ) => {
    const document = await prisma.document.create({
      data: {
        patientId,
        fileName: file.originalname,
        fileUrl,
        fileType: file.mimetype,
      },
    });

    logger.info(`Document uploaded: ${document.id} for patient ${patientId}`);

    return document;
  },

  /**
   * Delete a document
   */
  deleteDocument: async (id: string, patientId: string) => {
    const document = await prisma.document.findFirst({
      where: {
        id,
        patientId,
      },
    });

    if (!document) {
      throw new Error('Document not found');
    }

    await prisma.document.delete({
      where: { id },
    });

    logger.info(`Document deleted: ${id}`);

    return { message: 'Document deleted successfully' };
  },

  /**
   * Get patient statistics
   */
  getStatistics: async (patientId: string) => {
    const [appointmentsCount, completedAppointments, pendingPayments, totalSpent] =
      await Promise.all([
        prisma.appointment.count({
          where: { patientId },
        }),
        prisma.appointment.count({
          where: {
            patientId,
            status: 'COMPLETED',
          },
        }),
        prisma.payment.count({
          where: {
            patientId,
            status: 'PENDING',
          },
        }),
        prisma.payment.aggregate({
          where: {
            patientId,
            status: 'COMPLETED',
          },
          _sum: {
            amount: true,
          },
        }),
      ]);

    return {
      totalAppointments: appointmentsCount,
      completedAppointments,
      pendingPayments,
      totalSpent: totalSpent._sum.amount || 0,
    };
  },
};

