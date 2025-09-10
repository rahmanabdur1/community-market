import mongoose, { Schema, Document } from 'mongoose';

export interface IVendor extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  type: string; // pond owner, spot lister, gear rental, etc.
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const vendorSchema = new Schema<IVendor>({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  type: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model<IVendor>('Vendor', vendorSchema);
