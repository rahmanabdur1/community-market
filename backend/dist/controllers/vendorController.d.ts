import { Request, Response } from 'express';
export declare const createVendor: (req: Request, res: Response) => Promise<void>;
export declare const getVendors: (req: Request, res: Response) => Promise<void>;
export declare const getVendorById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateVendor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const changeStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=vendorController.d.ts.map