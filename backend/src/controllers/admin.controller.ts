import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { prisma } from '../config/db.config.js';

export const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
  const [totalUsers, totalProducts, totalOrders, revenueAggregate] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { totalPrice: true },
      where: { paymentStatus: 'Paid' },
    }),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true, email: true } } },
  });

  res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: revenueAggregate._sum.totalPrice || 0,
    },
    recentOrders,
  });
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, phone: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });
  res.status(200).json({ success: true, users });
});

export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      items: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.status(200).json({ success: true, orders });
});
