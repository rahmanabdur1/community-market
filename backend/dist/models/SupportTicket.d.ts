import mongoose, { Document } from 'mongoose';
export interface ISupportTicket extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    subject: string;
    message: string;
    status: 'open' | 'in_progress' | 'closed';
    createdAt: Date;
}
declare const _default: mongoose.Model<ISupportTicket, {}, {}, {}, mongoose.Document<unknown, {}, ISupportTicket, {}, {}> & ISupportTicket & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=SupportTicket.d.ts.map