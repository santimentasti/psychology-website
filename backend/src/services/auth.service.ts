import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database.js';
import { JWT_CONFIG } from '../config/jwt.js';
import { RegisterInput, LoginInput } from '../schemas/auth.schema.js';
import { JWTPayload } from '../types/jwt.types.js';
import { logger } from '../utils/logger.js';

export const authService = {
  /**
   * Register a new patient
   */
  register: async (data: RegisterInput) => {
    // Check if patient already exists
    const existingPatient = await prisma.patient.findUnique({
      where: { email: data.email },
    });

    if (existingPatient) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create patient
    const patient = await prisma.patient.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
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

    // Generate JWT token
    const token = jwt.sign(
      { patientId: patient.id, email: patient.email },
      JWT_CONFIG.secret,
      {
        expiresIn: JWT_CONFIG.expiresIn,
        issuer: JWT_CONFIG.issuer,
        audience: JWT_CONFIG.audience,
      }
    );

    logger.info(`New patient registered: ${patient.email}`);

    return {
      patient,
      token,
    };
  },

  /**
   * Login an existing patient
   */
  login: async (data: LoginInput) => {
    // Find patient by email
    const patient = await prisma.patient.findUnique({
      where: { email: data.email },
    });

    if (!patient) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(data.password, patient.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { patientId: patient.id, email: patient.email },
      JWT_CONFIG.secret,
      {
        expiresIn: JWT_CONFIG.expiresIn,
        issuer: JWT_CONFIG.issuer,
        audience: JWT_CONFIG.audience,
      }
    );

    logger.info(`Patient logged in: ${patient.email}`);

    return {
      patient: {
        id: patient.id,
        email: patient.email,
        firstName: patient.firstName,
        lastName: patient.lastName,
        phone: patient.phone,
        dateOfBirth: patient.dateOfBirth,
        address: patient.address,
        createdAt: patient.createdAt,
        updatedAt: patient.updatedAt,
      },
      token,
    };
  },

  /**
   * Get current patient profile
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
};

