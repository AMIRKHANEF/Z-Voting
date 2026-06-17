import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  CIRCUITS_PATH: z.string().default('./circuits/build'),
});

const envVars = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3001,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  CIRCUITS_PATH: process.env.CIRCUITS_PATH || './circuits/build',
};

export const config = envSchema.parse(envVars);
