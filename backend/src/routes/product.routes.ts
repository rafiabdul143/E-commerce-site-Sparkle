import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authenticateToken, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), createProduct);
router.put('/:id', authenticateToken, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), updateProduct);
router.delete('/:id', authenticateToken, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), deleteProduct);

export default router;
