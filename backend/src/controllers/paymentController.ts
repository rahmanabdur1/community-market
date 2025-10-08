import { Request, Response } from 'express';
import Payment from '../models/Payment';
import { asyncHandler, AppError } from '../utils/utils';

export const createPayment = asyncHandler(async (req: any, res: Response) => {
  const { amount, method, bookingId, orderId } = req.body;
  const payment = new Payment({ userId: req.user.id, amount, method, bookingId, orderId, status: 'pending' });
  await payment.save();
  // Simulate provider session creation; in production call bKash/Nagad APIs
  res.status(201).json({
    paymentId: payment._id,
    redirectUrl: `/payments/${payment._id}/gateway/${method}`,
  });
});

export const getPayments = asyncHandler(async (_req: Request, res: Response) => {
  const payments = await Payment.find().lean();
  res.json(payments);
});

export const getPaymentById = asyncHandler(async (req: Request, res: Response) => {
  const payment = await Payment.findById(req.params.id).lean();
  if (!payment) throw new AppError('Payment not found', 404);
  res.json(payment);
});

export const updatePaymentStatus = asyncHandler(async (req: Request, res: Response) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) throw new AppError('Payment not found', 404);
  payment.status = (req.body as any).status;
  await payment.save();
  res.json(payment);
});

export const verifyPayment = asyncHandler(async (req: Request, res: Response) => {
  const { paymentId, trxId } = req.body as any;
  const payment = await Payment.findById(paymentId);
  if (!payment) throw new AppError('Payment not found', 404);
  payment.status = 'completed';
  payment.providerRef = trxId;
  await payment.save();
  res.json({ message: 'Payment verified', payment });
});
