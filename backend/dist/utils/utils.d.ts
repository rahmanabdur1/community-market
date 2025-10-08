import { JwtPayload } from 'jsonwebtoken';
export declare const generateToken: (payload: object, expiresIn?: string) => string;
export declare const generateRefreshToken: (payload: object, expiresIn?: string) => string;
export declare const verifyToken: (token: string) => JwtPayload | null;
export declare const generateAccessToken: (payload: object, expiresIn?: string) => string;
export declare const verifyRefreshToken: (token: string) => JwtPayload | null;
export declare const logAnalytics: (type: string, referenceId: string, action: string, extraData?: Record<string, any>) => Promise<void>;
//# sourceMappingURL=utils.d.ts.map