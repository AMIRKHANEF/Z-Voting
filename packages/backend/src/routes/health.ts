import { Request, Response } from 'express';
import { createLogger } from '../services/logger.js';

const logger = createLogger();

export const healthRouter = {
  get: (req: Request, res: Response) => {
    logger.info({ action: 'health_check' });
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  },
};

export default {
  get: healthRouter.get,
} as any;
