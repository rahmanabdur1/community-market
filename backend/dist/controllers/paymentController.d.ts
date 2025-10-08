import { Request, Response } from 'express';
export declare const createPayment: (req: any, res: Response) => Promise<void>;
export declare const getPayments: (req: Request, res: Response) => Promise<void>;
export declare const getPaymentById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updatePaymentStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=paymentController.d.ts.map