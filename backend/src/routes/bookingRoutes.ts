import { Router } from 'express';
import { createBooking, getBookings, getBookingById, updateBooking, cancelBooking } from '../controllers/bookingController';
import {  roleMiddleware } from '../middleware/authMiddleware';

const router = Router();


router.post('/', roleMiddleware(['customer']), createBooking);
router.get('/', roleMiddleware(['admin', 'vendor']), getBookings);
router.get('/:id', getBookingById);
router.put('/:id', roleMiddleware(['customer', 'admin']), updateBooking);
router.patch('/:id/cancel', roleMiddleware(['customer', 'admin']), cancelBooking);
// Confirm booking (admin or vendor)
router.patch('/:id/confirm', roleMiddleware(['admin', 'vendor']), async (req, res) => {
  const controller = await import('../models/Booking');
  const Booking = controller.default;
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  booking.status = 'confirmed';
  await booking.save();
  res.json(booking);
});

export default router;
