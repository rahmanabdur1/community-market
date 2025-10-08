import mongoose, { Document } from 'mongoose';
export interface IVendor extends Document {
    name: string;
    email: string;
    phone: string;
    address: string;
    type: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
}
declare const _default: mongoose.Model<IVendor, {}, {}, {}, mongoose.Document<unknown, {}, IVendor, {}, {}> & IVendor & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Vendor.d.ts.map