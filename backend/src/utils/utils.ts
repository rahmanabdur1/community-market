import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import Analytics from '../models/Analytics';

const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';
const REFRESH_SECRET: string = process.env.REFRESH_SECRET || 'refreshsecret';

export const generateToken = (payload: object, expiresIn: string = '15m') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const generateRefreshToken = (payload: object, expiresIn: string = '7d') => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn });
};

// export const generateToken = (
//   payload: object,
//   expiresIn: string = '1h'
// ): string => {
//   const options: SignOptions = { expiresIn };
//   return jwt.sign(payload, JWT_SECRET, options);
// };


// export const generateRefreshToken = (
//   payload: object,
//   expiresIn: string = '7d'
// ): string => {
//   const options: SignOptions = { expiresIn };
//   return jwt.sign(payload, REFRESH_SECRET, options);
// };


export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (_err: unknown) {
    return null;
  }
};


export const generateAccessToken = (
  payload: object,
  expiresIn: string = "1h"
): string => {
  return generateToken(payload, expiresIn);
};


export const verifyRefreshToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
  } catch (_err: unknown) {
    return null;
  }
};

export const logAnalytics = async (
  type: string,
  referenceId: string,
  action: string,
  extraData?: Record<string, any>
): Promise<void> => {
  try {
    const record = new Analytics({ type, referenceId, action, extraData });
    await record.save();
  } catch (err: unknown) {
    console.error('Analytics logging failed:', err);
  }
};
