import { Request, Response } from 'express';
import Booking from '../models/Booking';
import { asyncHandler, AppError } from '../utils/utils';

export const createBooking = asyncHandler(async (req: any, res: Response) => {
  const booking = new Booking({ ...req.body, userId: req.user.id });
  await booking.save();
  res.status(201).json(booking);
});

export const getBookings = asyncHandler(async (_req: Request, res: Response) => {
  const bookings = await Booking.find().lean();
  res.json(bookings);
});

export const getBookingById = asyncHandler(async (req: Request, res: Response) => {
  const booking = await Booking.findById(req.params.id).lean();
  if (!booking) throw new AppError('Booking not found', 404);
  res.json(booking);
});

export const updateBooking = asyncHandler(async (req: Request, res: Response) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!booking) throw new AppError('Booking not found', 404);
  res.json(booking);
});

export const cancelBooking = asyncHandler(async (req: Request, res: Response) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new AppError('Booking not found', 404);
  booking.status = 'cancelled';
  await booking.save();
  res.json(booking);
});
