import { z } from 'zod';

export const paymentInitSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
    method: z.enum(['bkash', 'nagad']),
    bookingId: z.string().optional(),
    orderId: z.string().optional(),
  })
});

export const paymentVerifySchema = z.object({
  body: z.object({
    paymentId: z.string(),
    trxId: z.string(),
  })
});

