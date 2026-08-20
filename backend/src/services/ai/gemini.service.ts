import { getGeminiClient } from '../../config/gemini.config.js';
import { prisma } from '../../config/db.config.js';

export class GeminiService {
  static async processChat(message: string, userId?: string, sessionId?: string) {
    const gemini = getGeminiClient();

    // Create or locate chat session
    let session = sessionId
      ? await prisma.chatSession.findUnique({ where: { id: sessionId } })
      : null;

    if (!session) {
      session = await prisma.chatSession.create({
        data: {
          userId: userId || null,
          sessionTitle: message.substring(0, 30) || 'Shopping Assistant',
        },
      });
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        sender: 'user',
        content: message,
      },
    });

    if (!gemini) {
      // Intelligent fallback if API key is demo placeholder
      const mockReply = `Hello! I am Sparkle AI Assistant. I can help you find products (e.g. Shirts, Jackets), check your order status, or suggest styling. (Note: Add your GEMINI_API_KEY to backend .env for live Gemini LLM responses!)`;
      await prisma.chatMessage.create({
        data: {
          sessionId: session.id,
          sender: 'assistant',
          content: mockReply,
        },
      });
      return { sessionId: session.id, reply: mockReply };
    }

    try {
      const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are Sparkle AI Bot, a friendly, helpful shopping assistant for Sparkle Fashion Store. Help the customer find clothing items, check order status, or give styling recommendations. Customer message: ${message}`;

      const result = await model.generateContent(prompt);
      const replyText = result.response.text() || "I'm here to help! How can I assist your shopping today?";

      // Save assistant message
      await prisma.chatMessage.create({
        data: {
          sessionId: session.id,
          sender: 'assistant',
          content: replyText,
        },
      });

      return { sessionId: session.id, reply: replyText };
    } catch (err: any) {
      const errorReply = "I'm having trouble processing that right now. Please try again shortly!";
      return { sessionId: session.id, reply: errorReply };
    }
  }
}
