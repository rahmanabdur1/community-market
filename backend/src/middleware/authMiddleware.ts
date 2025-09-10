import { Request, Response, NextFunction } from 'express';
import { verifyToken as verifyJWT } from '../utils/utils';

// Verify JWT token
export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  const decoded: any = verifyJWT(token);

  if (!decoded) return res.status(403).json({ message: 'Invalid or expired token' });

  req.user = decoded;
  next();
};

// Role-based middleware
export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only access' });
  next();
};

export const isVendor = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== 'vendor') return res.status(403).json({ message: 'Vendor only access' });
  next();
};

export const isCustomer = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== 'customer') return res.status(403).json({ message: 'Customer only access' });
  next();
};
