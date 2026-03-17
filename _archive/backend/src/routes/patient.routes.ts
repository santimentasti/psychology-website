import { Router } from 'express';
import { patientController } from '../controllers/patient.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import { updateProfileSchema, changePasswordSchema } from '../schemas/patient.schema.js';

const router = Router();

// All patient routes require authentication
router.use(authenticate);

// Profile routes
router.get('/profile', patientController.getProfile);
router.put(
  '/profile',
  validate(updateProfileSchema),
  patientController.updateProfile
);

// Password change
router.post(
  '/change-password',
  validate(changePasswordSchema),
  patientController.changePassword
);

// Statistics
router.get('/statistics', patientController.getStatistics);

// Document routes
router.get('/documents', patientController.getDocuments);
router.get('/documents/:id', patientController.getDocumentById);
router.post(
  '/documents',
  upload.single('document'),
  patientController.uploadDocument
);
router.delete('/documents/:id', patientController.deleteDocument);

export default router;

