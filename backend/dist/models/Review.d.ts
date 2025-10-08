import mongoose, { Document } from 'mongoose';
export interface IReview extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    targetId: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<IReview, {}, {}, {}, mongoose.Document<unknown, {}, IReview, {}, {}> & IReview & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Review.d.ts.map