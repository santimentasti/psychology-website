import { z } from 'zod';
import { AppointmentStatus } from '../../../shared/types/appointment.types.js';

export const createAppointmentSchema = z.object({
  serviceId: z.string().min(1, 'Service ID is required'),
  dateTime: z.string().datetime('Invalid date format').transform((val) => new Date(val)),
  notes: z.string().optional(),
});

export const updateAppointmentSchema = z.object({
  dateTime: z.string().datetime('Invalid date format').transform((val) => new Date(val)).optional(),
  status: z.nativeEnum(AppointmentStatus).optional(),
  notes: z.string().optional(),
});

export const getAppointmentsQuerySchema = z.object({
  status: z.nativeEnum(AppointmentStatus).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  serviceId: z.string().optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
export type GetAppointmentsQuery = z.infer<typeof getAppointmentsQuerySchema>;

