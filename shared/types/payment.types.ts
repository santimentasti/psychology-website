export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentMethod {
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL'
}

export interface Payment {
  id: string;
  patientId: string;
  appointmentId?: string;
  serviceId: string;
  amount: number; // cents
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  stripePaymentId?: string;
  paypalOrderId?: string;
  packageType?: string; // monthly-4, monthly-8, prepaid-10
  sessionsRemaining?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentDTO {
  appointmentId?: string;
  serviceId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  packageType?: string;
}

