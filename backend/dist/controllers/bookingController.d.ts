import { Request, Response } from 'express';
export declare const createBooking: (req: any, res: Response) => Promise<void>;
export declare const getBookings: (req: Request, res: Response) => Promise<void>;
export declare const getBookingById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const cancelBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=bookingController.d.ts.map