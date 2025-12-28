import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { paymentRateLimiter } from '../middleware/rateLimit.middleware.js';
import {
  createPaymentIntentSchema,
  confirmPaymentSchema,
} from '../schemas/payment.schema.js';

const router = Router();

// All payment routes require authentication
router.use(authenticate);
router.use(paymentRateLimiter);

// Create payment intent
router.post(
  '/create-intent',
  validate(createPaymentIntentSchema),
  paymentController.createPaymentIntent
);

// Confirm payment
router.post(
  '/:id/confirm',
  validate(confirmPaymentSchema),
  paymentController.confirmPayment
);

// Get all payments
router.get('/', paymentController.getAll);

// Get payment by ID
router.get('/:id', paymentController.getById);

export default router;

