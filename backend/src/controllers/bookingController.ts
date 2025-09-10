import { Request, Response } from 'express';
import Booking from '../models/Booking';

export const createBooking = async (req: any, res: Response) => {
  const booking = new Booking({ ...req.body, userId: req.user.id });
  await booking.save();
  res.status(201).json(booking);
};

export const getBookings = async (req: Request, res: Response) => {
  const bookings = await Booking.find();
  res.json(bookings);
};

export const getBookingById = async (req: Request, res: Response) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
};

export const updateBooking = async (req: Request, res: Response) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
};

export const cancelBooking = async (req: Request, res: Response) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  booking.status = 'cancelled';
  await booking.save();
  res.json(booking);
};
