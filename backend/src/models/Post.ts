import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  content: string;
  media?: string[];
  comments: { userId: mongoose.Schema.Types.ObjectId; comment: string; createdAt: Date }[];
  createdAt: Date;
}

const postSchema = new Schema<IPost>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  media: [{ type: String }],
  comments: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    createdAt: Date,
  }],
}, { timestamps: true });

export default mongoose.model<IPost>('Post', postSchema);
