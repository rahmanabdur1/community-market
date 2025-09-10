import mongoose, { Schema, Document } from 'mongoose';

export interface IMarketplaceItem extends Document {
  title: string;
  description: string;
  price: number;
  vendorId: mongoose.Schema.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const marketplaceItemSchema = new Schema<IMarketplaceItem>({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model<IMarketplaceItem>('MarketplaceItem', marketplaceItemSchema);
