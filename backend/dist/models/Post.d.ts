import mongoose, { Document } from 'mongoose';
export interface IPost extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    content: string;
    media?: string[];
    comments: {
        userId: mongoose.Schema.Types.ObjectId;
        comment: string;
        createdAt: Date;
    }[];
    createdAt: Date;
}
declare const _default: mongoose.Model<IPost, {}, {}, {}, mongoose.Document<unknown, {}, IPost, {}, {}> & IPost & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Post.d.ts.map