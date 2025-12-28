import { Patient } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      patient?: Patient;
      patientId?: string;
    }
  }
}

export {};

