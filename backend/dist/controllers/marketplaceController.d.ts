import { Request, Response } from 'express';
export declare const createItem: (req: any, res: Response) => Promise<void>;
export declare const getItems: (req: Request, res: Response) => Promise<void>;
export declare const getItemById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const approveItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=marketplaceController.d.ts.map