import { z } from 'zod';
import { PaymentMethod } from '../../../shared/types/payment.types.js';
import { PACKAGE_TYPES } from '../../../shared/constants/index.js';

export const createPaymentSchema = z.object({
  appointmentId: z.string().uuid().optional(),
  serviceId: z.string().min(1, 'Service ID is required'),
  amount: z.number().int().positive('Amount must be positive'),
  currency: z.enum(['USD', 'EUR', 'ARS', 'MXN'], {
    errorMap: () => ({ message: 'Currency must be USD, EUR, ARS, or MXN' }),
  }),
  paymentMethod: z.nativeEnum(PaymentMethod),
  packageType: z.enum([
    PACKAGE_TYPES.MONTHLY_4,
    PACKAGE_TYPES.MONTHLY_8,
    PACKAGE_TYPES.PREPAID_10,
  ]).optional(),
});

export const createPaymentIntentSchema = z.object({
  appointmentId: z.string().uuid().optional(),
  serviceId: z.string().min(1, 'Service ID is required'),
  currency: z.enum(['USD', 'EUR', 'ARS', 'MXN']),
  paymentMethod: z.nativeEnum(PaymentMethod),
  packageType: z.enum([
    PACKAGE_TYPES.MONTHLY_4,
    PACKAGE_TYPES.MONTHLY_8,
    PACKAGE_TYPES.PREPAID_10,
  ]).optional(),
});

export const confirmPaymentSchema = z.object({
  paymentIntentId: z.string().min(1, 'Payment intent ID is required'),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type CreatePaymentIntentInput = z.infer<typeof createPaymentIntentSchema>;
export type ConfirmPaymentInput = z.infer<typeof confirmPaymentSchema>;

