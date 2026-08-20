import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderDetails,
  updateOrderStatus,
} from '../controllers/order.controller.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticateToken);

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);
router.get('/:id', getOrderDetails);
router.put('/:id/status', authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), updateOrderStatus);

export default router;
