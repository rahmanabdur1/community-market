import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  bookingId?: mongoose.Schema.Types.ObjectId;
  orderId?: mongoose.Schema.Types.ObjectId;
  amount: number;
  method: 'bkash' | 'nagad';
  providerRef?: string; // trxId or transaction reference
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['bkash', 'nagad'], required: true },
  providerRef: { type: String },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
}, { timestamps: true });

paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ method: 1, status: 1, createdAt: -1 });

export default mongoose.model<IPayment>('Payment', paymentSchema);
