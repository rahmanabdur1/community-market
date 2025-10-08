import mongoose, { Document } from 'mongoose';
export interface IOrder extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    items: {
        itemId: mongoose.Schema.Types.ObjectId;
        quantity: number;
    }[];
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: Date;
}
declare const _default: mongoose.Model<IOrder, {}, {}, {}, mongoose.Document<unknown, {}, IOrder, {}, {}> & IOrder & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Order.d.ts.map