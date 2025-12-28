import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { corsMiddleware } from './middleware/cors.middleware.js';
import { generalRateLimiter } from './middleware/rateLimit.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import routes from './routes/index.js';
import { logger } from './utils/logger.js';

dotenv.config();

const createApp = (): Express => {
  const app = express();

  // Security middleware
  app.use(helmet());
  
  // CORS
  app.use(corsMiddleware);

  // Body parsing
  // Webhook routes need raw body for signature verification
  app.use('/api/webhooks', express.raw({ type: 'application/json' }));
  // All other routes use JSON
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  // Rate limiting
  app.use(generalRateLimiter);

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ 
      status: 'ok', 
      message: 'Psychology API is running',
      timestamp: new Date().toISOString(),
    });
  });

  // API routes
  app.use('/api', routes);

  // 404 handler
  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      error: 'Route not found',
    });
  });

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
};

export default createApp;

