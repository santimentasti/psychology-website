import { Router } from 'express';
import { serviceController } from '../controllers/service.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { createServiceSchema, updateServiceSchema } from '../schemas/service.schema.js';

const router = Router();

// Get all services
router.get('/', serviceController.getAll);

// Get service by ID
router.get('/:id', serviceController.getById);

// Create a new service
router.post(
  '/',
  validate(createServiceSchema),
  serviceController.create
);

// Update a service
router.put(
  '/:id',
  validate(updateServiceSchema),
  serviceController.update
);

// Delete a service (soft delete)
router.delete('/:id', serviceController.delete);

export default router;

