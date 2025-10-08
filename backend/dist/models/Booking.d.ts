import mongoose, { Document } from 'mongoose';
export interface IBooking extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    listingId: mongoose.Schema.Types.ObjectId;
    date: Date;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: Date;
}
declare const _default: mongoose.Model<IBooking, {}, {}, {}, mongoose.Document<unknown, {}, IBooking, {}, {}> & IBooking & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Booking.d.ts.map