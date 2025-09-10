import mongoose, { Schema, Document } from 'mongoose';

export interface ISupportTicket extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: Date;
}

const supportTicketSchema = new Schema<ISupportTicket>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['open', 'in_progress', 'closed'], default: 'open' },
}, { timestamps: true });

export default mongoose.model<ISupportTicket>('SupportTicket', supportTicketSchema);
