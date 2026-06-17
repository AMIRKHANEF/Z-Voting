import { NextFunction, Request, Response } from 'express';
import { createLogger } from '../services/logger.js';

const logger = createLogger();

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    action: 'error_handler',
    method: req.method,
    path: req.path,
    error: err.message,
    stack: err.stack,
  });

  if (err.message.includes('validation')) {
    return res.status(400).json({
      error: 'Validation error',
      details: err.message,
    });
  }

  if (err.message.includes('Circuit')) {
    return res.status(500).json({
      error: 'Circuit error',
      details: err.message,
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
};
