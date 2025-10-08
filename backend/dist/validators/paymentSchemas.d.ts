import { z } from 'zod';
export declare const paymentInitSchema: z.ZodObject<{
    body: z.ZodObject<{
        amount: z.ZodNumber;
        method: z.ZodEnum<["bkash", "nagad"]>;
        bookingId: z.ZodOptional<z.ZodString>;
        orderId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        method: "bkash" | "nagad";
        amount: number;
        bookingId?: string | undefined;
        orderId?: string | undefined;
    }, {
        method: "bkash" | "nagad";
        amount: number;
        bookingId?: string | undefined;
        orderId?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        method: "bkash" | "nagad";
        amount: number;
        bookingId?: string | undefined;
        orderId?: string | undefined;
    };
}, {
    body: {
        method: "bkash" | "nagad";
        amount: number;
        bookingId?: string | undefined;
        orderId?: string | undefined;
    };
}>;
export declare const paymentVerifySchema: z.ZodObject<{
    body: z.ZodObject<{
        paymentId: z.ZodString;
        trxId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        paymentId: string;
        trxId: string;
    }, {
        paymentId: string;
        trxId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        paymentId: string;
        trxId: string;
    };
}, {
    body: {
        paymentId: string;
        trxId: string;
    };
}>;
//# sourceMappingURL=paymentSchemas.d.ts.map