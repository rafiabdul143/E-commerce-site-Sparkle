import { Router } from 'express';
import { handleAiChat, getChatHistory } from '../controllers/ai.controller.js';

const router = Router();

router.post('/chat', handleAiChat);
router.get('/history/:sessionId', getChatHistory);

export default router;
