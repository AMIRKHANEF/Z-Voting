import pino from 'pino';
import { config } from '../config/environment.js';

const pinoConfig = {
  level: config.LOG_LEVEL,
  transport:
    config.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
};

export const createLogger = () => {
  return pino(pinoConfig);
};
