import mongoose, { Document } from 'mongoose';
export interface IAnalytics extends Document {
    type: string;
    referenceId: mongoose.Types.ObjectId;
    action: string;
    timestamp: Date;
    extraData?: any;
}
declare const _default: mongoose.Model<IAnalytics, {}, {}, {}, mongoose.Document<unknown, {}, IAnalytics, {}, {}> & IAnalytics & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Analytics.d.ts.map