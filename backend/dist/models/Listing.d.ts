import mongoose, { Document } from 'mongoose';
export interface IListing extends Document {
    title: string;
    description: string;
    location: string;
    price: number;
    ownerId: mongoose.Schema.Types.ObjectId;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
}
declare const _default: mongoose.Model<IListing, {}, {}, {}, mongoose.Document<unknown, {}, IListing, {}, {}> & IListing & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Listing.d.ts.map