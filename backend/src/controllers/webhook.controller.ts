import { Request, Response } from 'express';
import { stripeService } from '../services/stripe.service.js';
import { paymentService } from '../services/payment.service.js';
import { ApiResponse } from '../types/api.types.js';
import { logger } from '../utils/logger.js';

export const webhookController = {
  /**
   * Handle Stripe webhook
   * POST /api/webhooks/stripe
   */
  handleStripeWebhook: async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers['stripe-signature'] as string;

    if (!sig) {
      res.status(400).json({
        success: false,
        error: 'Missing stripe-signature header',
      } as ApiResponse<null>);
      return;
    }

    try {
      // req.body is already a Buffer from express.raw()
      const event = stripeService.verifyWebhookSignature(
        req.body,
        sig
      );

      await paymentService.processStripeWebhook(event);

      res.status(200).json({ received: true });
    } catch (error) {
      logger.error('Stripe webhook error:', error);
      res.status(400).json({
        success: false,
        error: 'Webhook processing failed',
      } as ApiResponse<null>);
    }
  },

  /**
   * Handle PayPal webhook (if needed)
   * POST /api/webhooks/paypal
   */
  handlePayPalWebhook: async (req: Request, res: Response): Promise<void> => {
    // PayPal webhook handling can be implemented here
    // For now, we'll use the capture endpoint directly
    res.status(200).json({ received: true });
  },
};

