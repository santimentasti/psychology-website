import { Router } from 'express';
import { appointmentController } from '../controllers/appointment.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { createAppointmentSchema, updateAppointmentSchema } from '../schemas/appointment.schema.js';

const router = Router();

// All appointment routes require authentication
router.use(authenticate);

// Get available time slots (public endpoint, but can be protected if needed)
router.get('/available-slots', appointmentController.getAvailableSlots);

// Get all appointments for authenticated patient
router.get('/', appointmentController.getAll);

// Get appointment by ID
router.get('/:id', appointmentController.getById);

// Create a new appointment
router.post(
  '/',
  validate(createAppointmentSchema),
  appointmentController.create
);

// Update an appointment
router.put(
  '/:id',
  validate(updateAppointmentSchema),
  appointmentController.update
);

// Cancel an appointment
router.delete('/:id', appointmentController.cancel);

export default router;

