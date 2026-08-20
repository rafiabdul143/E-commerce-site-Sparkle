import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { OrderService } from '../services/order.service.js';

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const order = await OrderService.createOrder({ ...req.body, userId });
  res.status(201).json({ success: true, message: 'Order placed successfully', order });
});

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const orders = await OrderService.getUserOrders(userId);
  res.status(200).json({ success: true, orders });
});

export const getOrderDetails = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.role === 'ADMIN' ? undefined : req.user!.id;
  const order = await OrderService.getOrderById(req.params.id, userId);
  res.status(200).json({ success: true, order });
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;
  const order = await OrderService.updateOrderStatus(req.params.id, status);
  res.status(200).json({ success: true, message: 'Order status updated', order });
});
