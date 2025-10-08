import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Define custom interface for JWT payload
interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

// Backwards-compatible alias names for routes expecting older exports
export const verifyToken = protect;

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).userRole || 'user';
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

export const authMiddleware = protect;

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userRole = (req as any).userRole || 'user';
  if (userRole !== 'admin') {
    return res.status(403).json({ message: 'Admin only' });
  }
  next();
};