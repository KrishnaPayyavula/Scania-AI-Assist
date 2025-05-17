import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import queryRoutes from './routes/queryRoutes';
import logger from './utils/logger';

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: env.CORS_ORIGIN,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// API routes
app.use('/api', queryRoutes);

// Health check endpoint
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

// Handle 404
app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handling middleware
app.use((err: Error, _: express.Request, res: express.Response, __: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;