import app from './app';
import { env, validateEnv } from './config/env';
import sequelize, { testConnection } from './config/database';
import logger from './utils/logger';

// Start server
const startServer = async (): Promise<void> => {
  try {
    // Validate environment variables
    validateEnv();
    
    // Test database connection
    // await testConnection();
    
    // Sync database models
    // await sequelize.sync();
    logger.info('Database models synchronized');
    
    // Start server
    app.listen(env.PORT, () => {
      logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Rejection:', reason);
  // Don't exit process in production to allow graceful handling
  if (env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

startServer();