import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt.js';
import { prisma } from '../config/database.js';
import { JWTPayload } from '../types/jwt.types.js';
import { ApiResponse } from '../types/api.types.js';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'No token provided',
      } as ApiResponse<null>);
      return;
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, JWT_CONFIG.secret) as JWTPayload;

      const patient = await prisma.patient.findUnique({
        where: { id: decoded.patientId },
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
        res.status(401).json({
          success: false,
          error: 'Patient not found',
        } as ApiResponse<null>);
        return;
      }

      req.patient = patient as any;
      req.patientId = patient.id;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        error: 'Invalid or expired token',
      } as ApiResponse<null>);
      return;
    }
  } catch (error) {
    next(error);
  }
};

