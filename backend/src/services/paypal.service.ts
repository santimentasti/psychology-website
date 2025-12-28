import paypal from '@paypal/checkout-server-sdk';
import { paypalClient } from '../config/paypal.js';
import { logger } from '../utils/logger.js';

export const paypalService = {
  /**
   * Create a PayPal order
   */
  createOrder: async (
    amount: number,
    currency: string,
    metadata?: Record<string, string>
  ): Promise<string> => {
    try {
      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer('return=representation');
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: (amount / 100).toFixed(2), // Convert cents to dollars
            },
            description: metadata?.description || 'Psychology Practice Service',
          },
        ],
        application_context: {
          brand_name: 'Psychology Practice',
          landing_page: 'BILLING',
          user_action: 'PAY_NOW',
          return_url: process.env.PAYPAL_RETURN_URL || 'http://localhost:5173/payment/success',
          cancel_url: process.env.PAYPAL_CANCEL_URL || 'http://localhost:5173/payment/cancel',
        },
      });

      const order = await paypalClient.execute(request);
      
      if (order.statusCode !== 201) {
        throw new Error('Failed to create PayPal order');
      }

      const orderId = order.result.id;
      logger.info(`PayPal order created: ${orderId}`);
      return orderId;
    } catch (error) {
      logger.error('PayPal create order error:', error);
      throw new Error('Failed to create PayPal order');
    }
  },

  /**
   * Capture a PayPal order
   */
  captureOrder: async (orderId: string): Promise<paypal.orders.OrdersCaptureResponse> => {
    try {
      const request = new paypal.orders.OrdersCaptureRequest(orderId);
      request.requestBody({});

      const capture = await paypalClient.execute(request);
      
      if (capture.statusCode !== 201) {
        throw new Error('Failed to capture PayPal order');
      }

      logger.info(`PayPal order captured: ${orderId}`);
      return capture;
    } catch (error) {
      logger.error('PayPal capture order error:', error);
      throw new Error('Failed to capture PayPal order');
    }
  },

  /**
   * Get order details
   */
  getOrder: async (orderId: string): Promise<paypal.orders.OrdersGetResponse> => {
    try {
      const request = new paypal.orders.OrdersGetRequest(orderId);
      const order = await paypalClient.execute(request);
      return order;
    } catch (error) {
      logger.error('PayPal get order error:', error);
      throw new Error('Order not found');
    }
  },
};

