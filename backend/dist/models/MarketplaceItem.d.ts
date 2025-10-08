import mongoose, { Document } from 'mongoose';
export interface IMarketplaceItem extends Document {
    title: string;
    description: string;
    price: number;
    vendorId: mongoose.Schema.Types.ObjectId;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
}
declare const _default: mongoose.Model<IMarketplaceItem, {}, {}, {}, mongoose.Document<unknown, {}, IMarketplaceItem, {}, {}> & IMarketplaceItem & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=MarketplaceItem.d.ts.map