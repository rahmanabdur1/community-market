import { Request, Response } from 'express';
export declare const createTicket: (req: any, res: Response) => Promise<void>;
export declare const getTickets: (req: Request, res: Response) => Promise<void>;
export declare const getTicketById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateTicket: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=supportController.d.ts.map