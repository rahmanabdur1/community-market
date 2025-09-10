import { Request, Response } from 'express';
import Payment from '../models/Payment';

export const createPayment = async (req: any, res: Response) => {
  const payment = new Payment({ ...req.body, userId: req.user.id });
  await payment.save();
  res.status(201).json(payment);
};

export const getPayments = async (req: Request, res: Response) => {
  const payments = await Payment.find();
  res.json(payments);
};

export const getPaymentById = async (req: Request, res: Response) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) return res.status(404).json({ message: 'Payment not found' });
  res.json(payment);
};

export const updatePaymentStatus = async (req: Request, res: Response) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) return res.status(404).json({ message: 'Payment not found' });
  payment.status = req.body.status;
  await payment.save();
  res.json(payment);
};
