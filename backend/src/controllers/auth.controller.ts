import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AuthService } from '../services/auth.service.js';
import { prisma } from '../config/db.config.js';

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;
  const result = await AuthService.register(name, email, password, phone);
  res.status(201).json({ success: true, message: 'Registration successful', ...result });
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await AuthService.login(email, password);
  res.status(200).json({ success: true, message: 'Login successful', ...result });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { id: true, name: true, email: true, role: true, phone: true, createdAt: true },
  });
  res.status(200).json({ success: true, user });
});
