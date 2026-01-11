import dotenv from 'dotenv';
import createApp from './server.js';
import { logger } from './utils/logger.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Required for Railway - must bind to all interfaces
const app = createApp();

// Start server - bind to 0.0.0.0 for container environments
app.listen(Number(PORT), HOST, () => {
  logger.info(`🚀 Server is running on http://${HOST}:${PORT}`);
  logger.info(`📡 Health check: http://${HOST}:${PORT}/health`);
  logger.info(`🔌 API endpoint: http://${HOST}:${PORT}/api`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

