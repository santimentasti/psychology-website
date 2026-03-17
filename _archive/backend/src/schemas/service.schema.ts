import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.number().int().positive('Duration must be a positive number'),
  priceUSD: z.number().int().nonnegative('Price must be non-negative'),
  priceEUR: z.number().int().nonnegative('Price must be non-negative'),
  priceARS: z.number().int().nonnegative('Price must be non-negative'),
  priceMXN: z.number().int().nonnegative('Price must be non-negative'),
});

export const updateServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  duration: z.number().int().positive('Duration must be a positive number').optional(),
  priceUSD: z.number().int().nonnegative('Price must be non-negative').optional(),
  priceEUR: z.number().int().nonnegative('Price must be non-negative').optional(),
  priceARS: z.number().int().nonnegative('Price must be non-negative').optional(),
  priceMXN: z.number().int().nonnegative('Price must be non-negative').optional(),
  isActive: z.boolean().optional(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;

