import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalytics extends Document {
  type: string; // e.g., 'user', 'vendor', 'listing', 'booking', 'payment'
  referenceId: mongoose.Types.ObjectId;
  action: string; // e.g., 'created', 'updated', 'deleted', 'approved'
  timestamp: Date;
  extraData?: any;
}

const AnalyticsSchema: Schema = new Schema({
  type: { type: String, required: true },
  referenceId: { type: Schema.Types.ObjectId, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  extraData: { type: Schema.Types.Mixed },
});

export default mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
