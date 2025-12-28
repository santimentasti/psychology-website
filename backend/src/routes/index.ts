import { Router } from 'express';

const router = Router();

// Health check route
router.get('/', (_req, res) => {
  res.json({ 
    message: 'Welcome to Psychology Practice API',
    version: '1.0.0',
  });
});

// Route imports
import authRoutes from './auth.routes.js';
import serviceRoutes from './service.routes.js';
import appointmentRoutes from './appointment.routes.js';
import paymentRoutes from './payment.routes.js';
import webhookRoutes from './webhook.routes.js';
// import patientRoutes from './patient.routes.js';

// Register routes
router.use('/auth', authRoutes);
router.use('/services', serviceRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/payments', paymentRoutes);
router.use('/webhooks', webhookRoutes);
// router.use('/patients', patientRoutes);

export default router;
