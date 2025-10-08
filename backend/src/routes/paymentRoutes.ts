import { Router } from 'express';
// Correct import
import { createPayment, getPayments, getPaymentById, updatePaymentStatus, verifyPayment } from '../controllers/paymentController';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware';
import { validate } from '../middleware/validate';
import { paymentInitSchema, paymentVerifySchema } from '../validators/paymentSchemas';

const router = Router();

router.use(authMiddleware);
// Manual payment confirmation endpoint per spec
router.post('/manual', roleMiddleware(['customer', 'admin']), validate(paymentInitSchema), createPayment);
router.get('/', roleMiddleware(['admin', 'vendor']), getPayments);
router.get('/:id', getPaymentById);
router.patch('/:id/status', roleMiddleware(['admin']), updatePaymentStatus);
router.post('/verify', roleMiddleware(['customer', 'admin']), validate(paymentVerifySchema), verifyPayment);

export default router;
