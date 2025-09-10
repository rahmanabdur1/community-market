import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  targetId: mongoose.Schema.Types.ObjectId; // Vendor, Listing, or Item
  rating: number;
  comment: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  targetId: { type: Schema.Types.ObjectId, required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
}, { timestamps: true });

export default mongoose.model<IReview>('Review', reviewSchema);
