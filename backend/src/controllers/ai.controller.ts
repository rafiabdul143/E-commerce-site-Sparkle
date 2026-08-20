import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { GeminiService } from '../services/ai/gemini.service.js';
import { prisma } from '../config/db.config.js';

export const handleAiChat = asyncHandler(async (req: Request, res: Response) => {
  const { message, sessionId } = req.body;
  const userId = req.user?.id;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  const result = await GeminiService.processChat(message, userId, sessionId);
  res.status(200).json({ success: true, ...result });
});

export const getChatHistory = asyncHandler(async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const messages = await prisma.chatMessage.findMany({
    where: { sessionId },
    orderBy: { createdAt: 'asc' },
  });
  res.status(200).json({ success: true, messages });
});
