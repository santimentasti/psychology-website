import Stripe from 'stripe';
import { logger } from '../utils/logger.js';

// Stripe configuration
// In development, you can use test keys or leave empty (features will be disabled)
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';

if (!STRIPE_SECRET_KEY) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('STRIPE_SECRET_KEY is required in production');
  } else {
    logger.warn('⚠️  STRIPE_SECRET_KEY not configured. Stripe features will be disabled.');
  }
}

export const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
      typescript: true,
    })
  : null;

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

// Helper to check if Stripe is configured
export const isStripeConfigured = (): boolean => {
  return !!STRIPE_SECRET_KEY && !!stripe;
};

