import mongoose, { Document } from 'mongoose';
export interface IPayment extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    bookingId?: mongoose.Schema.Types.ObjectId;
    orderId?: mongoose.Schema.Types.ObjectId;
    amount: number;
    method: string;
    status: 'pending' | 'completed' | 'failed';
    createdAt: Date;
}
declare const _default: mongoose.Model<IPayment, {}, {}, {}, mongoose.Document<unknown, {}, IPayment, {}, {}> & IPayment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Payment.d.ts.map