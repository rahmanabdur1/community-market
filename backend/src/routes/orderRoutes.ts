import { Router } from 'express';
import { createOrder, getOrders, getOrderById, updateOrderStatus } from '../controllers/orderController';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.post('/', roleMiddleware(['customer']), createOrder);
router.get('/', roleMiddleware(['admin', 'vendor']), getOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', roleMiddleware(['admin']), updateOrderStatus);

export default router;
