import { prisma } from '../config/database.js';
import { stripeService } from './stripe.service.js';
import { paypalService } from './paypal.service.js';
import { CreatePaymentInput, CreatePaymentIntentInput } from '../schemas/payment.schema.js';
import { PaymentStatus, PaymentMethod } from '../../../shared/types/payment.types.js';
import { PACKAGE_TYPES } from '../../../shared/constants/index.js';
import { logger } from '../utils/logger.js';

export const paymentService = {
  /**
   * Calculate amount based on service and package type
   */
  calculateAmount: async (serviceId: string, currency: string, packageType?: string): Promise<number> => {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new Error('Service not found');
    }

    if (!service.isActive) {
      throw new Error('Service is not active');
    }

    // Get price based on currency
    let basePrice = 0;
    switch (currency.toUpperCase()) {
      case 'USD':
        basePrice = service.priceUSD;
        break;
      case 'EUR':
        basePrice = service.priceEUR;
        break;
      case 'ARS':
        basePrice = service.priceARS;
        break;
      case 'MXN':
        basePrice = service.priceMXN;
        break;
      default:
        throw new Error('Invalid currency');
    }

    // Calculate sessions remaining based on package type
    let sessionsRemaining: number | undefined;
    if (packageType) {
      switch (packageType) {
        case PACKAGE_TYPES.MONTHLY_4:
          sessionsRemaining = 4;
          break;
        case PACKAGE_TYPES.MONTHLY_8:
          sessionsRemaining = 8;
          break;
        case PACKAGE_TYPES.PREPAID_10:
          sessionsRemaining = 10;
          break;
      }
    }

    // For packages, calculate total amount (base price * sessions)
    if (packageType && sessionsRemaining) {
      return basePrice * sessionsRemaining;
    }

    return basePrice;
  },

  /**
   * Create a payment intent (Stripe or PayPal)
   */
  createPaymentIntent: async (
    patientId: string,
    data: CreatePaymentIntentInput
  ) => {
    // Validate appointment if provided
    if (data.appointmentId) {
      const appointment = await prisma.appointment.findFirst({
        where: {
          id: data.appointmentId,
          patientId,
        },
      });

      if (!appointment) {
        throw new Error('Appointment not found');
      }

      // Check if appointment already has a payment
      const existingPayment = await prisma.payment.findUnique({
        where: { appointmentId: data.appointmentId },
      });

      if (existingPayment && existingPayment.status === PaymentStatus.COMPLETED) {
        throw new Error('Appointment already has a completed payment');
      }
    }

    // Calculate amount
    const amount = await paymentService.calculateAmount(
      data.serviceId,
      data.currency,
      data.packageType
    );

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        patientId,
        appointmentId: data.appointmentId,
        serviceId: data.serviceId,
        amount,
        currency: data.currency,
        status: PaymentStatus.PENDING,
        paymentMethod: data.paymentMethod,
        packageType: data.packageType,
        sessionsRemaining: data.packageType
          ? data.packageType === PACKAGE_TYPES.MONTHLY_4
            ? 4
            : data.packageType === PACKAGE_TYPES.MONTHLY_8
            ? 8
            : 10
          : undefined,
      },
    });

    // Create payment intent with provider
    let paymentIntentId: string;
    let clientSecret: string | undefined;

    if (data.paymentMethod === PaymentMethod.STRIPE) {
      const stripeIntent = await stripeService.createPaymentIntent(amount, data.currency, {
        paymentId: payment.id,
        patientId,
        serviceId: data.serviceId,
        appointmentId: data.appointmentId || '',
      });

      paymentIntentId = stripeIntent.id;
      clientSecret = stripeIntent.client_secret || undefined;

      await prisma.payment.update({
        where: { id: payment.id },
        data: { stripePaymentId: paymentIntentId },
      });
    } else {
      // PayPal
      const paypalOrderId = await paypalService.createOrder(amount, data.currency, {
        paymentId: payment.id,
        patientId,
        serviceId: data.serviceId,
        appointmentId: data.appointmentId || '',
      });

      paymentIntentId = paypalOrderId;

      await prisma.payment.update({
        where: { id: payment.id },
        data: { paypalOrderId: paypalOrderId },
      });
    }

    logger.info(`Payment intent created: ${payment.id} with ${data.paymentMethod}`);

    return {
      payment,
      paymentIntentId,
      clientSecret, // Only for Stripe
    };
  },

  /**
   * Confirm a payment
   */
  confirmPayment: async (paymentId: string, patientId: string) => {
    const payment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        patientId,
      },
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    if (payment.status === PaymentStatus.COMPLETED) {
      throw new Error('Payment already completed');
    }

    // Confirm with provider
    if (payment.paymentMethod === PaymentMethod.STRIPE && payment.stripePaymentId) {
      const stripeIntent = await stripeService.confirmPaymentIntent(payment.stripePaymentId);

      if (stripeIntent.status === 'succeeded') {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: PaymentStatus.COMPLETED },
        });

        logger.info(`Payment completed: ${payment.id}`);
        return { ...payment, status: PaymentStatus.COMPLETED };
      }
    } else if (payment.paymentMethod === PaymentMethod.PAYPAL && payment.paypalOrderId) {
      const paypalOrder = await paypalService.captureOrder(payment.paypalOrderId);

      if (paypalOrder.result.status === 'COMPLETED') {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: PaymentStatus.COMPLETED },
        });

        logger.info(`Payment completed: ${payment.id}`);
        return { ...payment, status: PaymentStatus.COMPLETED };
      }
    }

    throw new Error('Payment confirmation failed');
  },

  /**
   * Get all payments for a patient
   */
  getAll: async (patientId: string) => {
    const payments = await prisma.payment.findMany({
      where: { patientId },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        appointment: {
          select: {
            id: true,
            dateTime: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return payments;
  },

  /**
   * Get a payment by ID
   */
  getById: async (id: string, patientId: string) => {
    const payment = await prisma.payment.findFirst({
      where: {
        id,
        patientId,
      },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            duration: true,
          },
        },
        appointment: {
          select: {
            id: true,
            dateTime: true,
            status: true,
            notes: true,
          },
        },
      },
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    return payment;
  },

  /**
   * Process webhook event (Stripe)
   */
  processStripeWebhook: async (event: any) => {
    const paymentIntent = event.data.object as any;

    if (event.type === 'payment_intent.succeeded') {
      const payment = await prisma.payment.findFirst({
        where: { stripePaymentId: paymentIntent.id },
      });

      if (payment && payment.status !== PaymentStatus.COMPLETED) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: PaymentStatus.COMPLETED },
        });

        logger.info(`Payment completed via webhook: ${payment.id}`);
      }
    } else if (event.type === 'payment_intent.payment_failed') {
      const payment = await prisma.payment.findFirst({
        where: { stripePaymentId: paymentIntent.id },
      });

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: PaymentStatus.FAILED },
        });

        logger.info(`Payment failed via webhook: ${payment.id}`);
      }
    }
  },
};

