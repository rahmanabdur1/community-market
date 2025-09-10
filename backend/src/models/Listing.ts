import mongoose, { Schema, Document } from 'mongoose';

export interface IListing extends Document {
  title: string;
  description: string;
  location: string;
  price: number;
  ownerId: mongoose.Schema.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const listingSchema = new Schema<IListing>({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  price: { type: Number },
  ownerId: { type: Schema.Types.ObjectId, ref: 'Vendor' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model<IListing>('Listing', listingSchema);
