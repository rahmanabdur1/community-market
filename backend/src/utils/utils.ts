import jwt, { SignOptions } from 'jsonwebtoken';
import Analytics from '../models/Analytics';

const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';
const REFRESH_SECRET: string = process.env.REFRESH_SECRET || 'refreshsecret';

// Generate access token
export const generateToken = (payload: object, expiresIn: string = '1h'): string => {
  const options: SignOptions = { expiresIn: expiresIn as unknown as string | number };
  return jwt.sign(payload, JWT_SECRET, options);
};

// Generate refresh token
export const generateRefreshToken = (payload: object, expiresIn: string = '7d'): string => {
  const options: SignOptions = { expiresIn: expiresIn as unknown as string | number };
  return jwt.sign(payload, REFRESH_SECRET, options);
};

// Verify access token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

// Verify refresh token
export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch {
    return null;
  }
};

// Analytics logger
export const logAnalytics = async (
  type: string,
  referenceId: string,
  action: string,
  extraData?: any
) => {
  try {
    const record = new Analytics({ type, referenceId, action, extraData });
    await record.save();
  } catch (err) {
    console.error('Analytics logging failed:', err);
  }
};
