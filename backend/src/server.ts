import app from './app.js';
import { env } from './config/env.config.js';
import { connectDatabase } from './config/db.config.js';
import { logger } from './utils/logger.js';

const startServer = async () => {
  await connectDatabase();

  const server = app.listen(env.PORT, () => {
    logger.info(`🚀 Sparkle Backend running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    logger.info(`📡 API Base Endpoint: http://localhost:${env.PORT}/api/v1`);
  });

  const handleShutdown = () => {
    logger.info('Shutting down server gracefully...');
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', handleShutdown);
  process.on('SIGINT', handleShutdown);
};

startServer();
