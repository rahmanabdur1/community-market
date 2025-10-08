import { Request, Response } from 'express';
export declare const createReview: (req: any, res: Response) => Promise<void>;
export declare const getReviews: (req: Request, res: Response) => Promise<void>;
export declare const getReviewById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=reviewController.d.ts.map