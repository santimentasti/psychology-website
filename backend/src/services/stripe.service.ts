import Stripe from 'stripe';
import { stripe } from '../config/stripe.js';
import { logger } from '../utils/logger.js';

export const stripeService = {
  /**
   * Create a payment intent
   */
  createPaymentIntent: async (
    amount: number,
    currency: string,
    metadata?: Record<string, string>
  ): Promise<Stripe.PaymentIntent> => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: currency.toLowerCase(),
        metadata: metadata || {},
        automatic_payment_methods: {
          enabled: true,
        },
      });

      logger.info(`Stripe payment intent created: ${paymentIntent.id}`);
      return paymentIntent;
    } catch (error) {
      logger.error('Stripe create payment intent error:', error);
      throw new Error('Failed to create payment intent');
    }
  },

  /**
   * Confirm a payment intent
   */
  confirmPaymentIntent: async (paymentIntentId: string): Promise<Stripe.PaymentIntent> => {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status === 'succeeded') {
        return paymentIntent;
      }

      const confirmed = await stripe.paymentIntents.confirm(paymentIntentId);
      logger.info(`Stripe payment intent confirmed: ${paymentIntentId}`);
      return confirmed;
    } catch (error) {
      logger.error('Stripe confirm payment intent error:', error);
      throw new Error('Failed to confirm payment intent');
    }
  },

  /**
   * Retrieve a payment intent
   */
  retrievePaymentIntent: async (paymentIntentId: string): Promise<Stripe.PaymentIntent> => {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      logger.error('Stripe retrieve payment intent error:', error);
      throw new Error('Payment intent not found');
    }
  },

  /**
   * Create a refund
   */
  createRefund: async (
    paymentIntentId: string,
    amount?: number
  ): Promise<Stripe.Refund> => {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount,
      });

      logger.info(`Stripe refund created: ${refund.id}`);
      return refund;
    } catch (error) {
      logger.error('Stripe create refund error:', error);
      throw new Error('Failed to create refund');
    }
  },

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature: (
    payload: string | Buffer,
    signature: string
  ): Stripe.Event => {
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );
      return event;
    } catch (error) {
      logger.error('Stripe webhook signature verification failed:', error);
      throw new Error('Invalid webhook signature');
    }
  },
};

