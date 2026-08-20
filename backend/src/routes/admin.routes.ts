import { Router } from 'express';
import { getDashboardStats, getAllUsers, getAllOrders } from '../controllers/admin.controller.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticateToken, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN));

router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/orders', getAllOrders);

export default router;
