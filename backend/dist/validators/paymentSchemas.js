"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentVerifySchema = exports.paymentInitSchema = void 0;
const zod_1 = require("zod");
exports.paymentInitSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.number().positive(),
        method: zod_1.z.enum(['bkash', 'nagad']),
        bookingId: zod_1.z.string().optional(),
        orderId: zod_1.z.string().optional(),
    })
});
exports.paymentVerifySchema = zod_1.z.object({
    body: zod_1.z.object({
        paymentId: zod_1.z.string(),
        trxId: zod_1.z.string(),
    })
});
//# sourceMappingURL=paymentSchemas.js.map