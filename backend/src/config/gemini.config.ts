import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from './env.config.js';
import { logger } from '../utils/logger.js';

let aiInstance: GoogleGenerativeAI | null = null;

if (env.GEMINI_API_KEY && env.GEMINI_API_KEY !== 'AIzaSy_demo_key_placeholder') {
  aiInstance = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  logger.info('🤖 Google Gemini AI Client initialized');
} else {
  logger.warn('⚠️ GEMINI_API_KEY not configured. AI bot features will operate in demo fallback mode.');
}

export const getGeminiClient = (): GoogleGenerativeAI | null => {
  return aiInstance;
};
