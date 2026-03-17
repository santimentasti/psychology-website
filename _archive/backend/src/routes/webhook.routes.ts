import { Router } from 'express';
import { webhookController } from '../controllers/webhook.controller.js';

const router = Router();

// Stripe webhook - raw body is handled in server.ts
router.post('/stripe', webhookController.handleStripeWebhook);

// PayPal webhook
router.post('/paypal', webhookController.handlePayPalWebhook);

export default router;

