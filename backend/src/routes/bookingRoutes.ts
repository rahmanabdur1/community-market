import { Router } from 'express';
import { createBooking, getBookings, getBookingById, updateBooking, cancelBooking } from '../controllers/bookingController';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.post('/', roleMiddleware(['customer']), createBooking);
router.get('/', roleMiddleware(['admin', 'vendor']), getBookings);
router.get('/:id', getBookingById);
router.put('/:id', roleMiddleware(['customer', 'admin']), updateBooking);
router.patch('/:id/cancel', roleMiddleware(['customer', 'admin']), cancelBooking);

export default router;
