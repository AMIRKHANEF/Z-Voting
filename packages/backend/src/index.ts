import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createLogger } from './services/logger.js';
import { config } from './config/environment.js';
import proofRoutes from './routes/proof.js';
import merkleRoutes from './routes/merkle.js';
import votingRoutes from './routes/voting.js';
import healthRoutes from './routes/health.js';
import { errorHandler } from './middleware/errorHandler.js';

const logger = createLogger();
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    path: req.path,
    ip: req.ip,
  });
  next();
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/proof', proofRoutes);
app.use('/api/merkle', merkleRoutes);
app.use('/api/voting', votingRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = config.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${config.NODE_ENV}`);
});

export default app;
