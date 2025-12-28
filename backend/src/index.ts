import dotenv from 'dotenv';
import createApp from './server.js';
import { logger } from './utils/logger.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = createApp();

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server is running on http://localhost:${PORT}`);
  logger.info(`📡 Health check: http://localhost:${PORT}/health`);
  logger.info(`🔌 API endpoint: http://localhost:${PORT}/api`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

