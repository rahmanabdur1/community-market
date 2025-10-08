import { JwtPayload } from 'jsonwebtoken';
export declare const generateToken: (payload: object, expiresIn?: string) => string;
export declare const generateRefreshToken: (payload: object, expiresIn?: string) => string;
export declare const verifyToken: (token: string) => JwtPayload | null;
export declare const generateAccessToken: (payload: object, expiresIn?: string) => string;
export declare const verifyRefreshToken: (token: string) => JwtPayload | null;
export declare const logAnalytics: (type: string, referenceId: string, action: string, extraData?: Record<string, any>) => Promise<void>;
export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode?: number);
}
export declare const asyncHandler: <T extends (...args: any[]) => Promise<any>>(fn: T) => (req: any, res: any, next: any) => void;
//# sourceMappingURL=utils.d.ts.map