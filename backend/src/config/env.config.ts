import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  GEMINI_API_KEY: z.string().optional(),
  CLIENT_URL: z.string().default('http://localhost:5173'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;

if (env.NODE_ENV === 'production' && env.CLIENT_URL.includes('localhost')) {
  console.error('CLIENT_URL must be set to the deployed frontend URL in production');
  process.exit(1);
}

if (env.NODE_ENV === 'production' && env.JWT_SECRET.length < 32) {
  console.error('JWT_SECRET must be at least 32 characters in production');
  process.exit(1);
}
