import { Router } from 'express';
// Correct import
import { createPayment, getPayments, getPaymentById, updatePaymentStatus } from '../controllers/paymentController';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
// Manual payment confirmation endpoint per spec
router.post('/manual', roleMiddleware(['customer', 'admin']), createPayment);
router.get('/', roleMiddleware(['admin', 'vendor']), getPayments);
router.get('/:id', getPaymentById);
router.patch('/:id/status', roleMiddleware(['admin']), updatePaymentStatus);

export default router;
