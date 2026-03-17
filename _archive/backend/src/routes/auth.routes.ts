import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authRateLimiter } from '../middleware/rateLimit.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

// Register route
router.post(
  '/register',
  authRateLimiter,
  validate(registerSchema),
  authController.register
);

// Login route
router.post(
  '/login',
  authRateLimiter,
  validate(loginSchema),
  authController.login
);

// Get current user profile (protected route)
router.get(
  '/profile',
  authenticate,
  authController.getProfile
);

export default router;

