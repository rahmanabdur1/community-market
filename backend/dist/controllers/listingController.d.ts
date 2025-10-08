import { Request, Response } from 'express';
export declare const createListing: (req: any, res: Response) => Promise<void>;
export declare const getListings: (req: Request, res: Response) => Promise<void>;
export declare const getListingById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateListing: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const approveListing: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteListing: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const checkAvailability: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=listingController.d.ts.map