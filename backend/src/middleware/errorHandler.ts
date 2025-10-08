import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/utils';

export const notFound = (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
};

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err instanceof AppError ? err.statusCode : err.statusCode || 500;
  const message = err.message || 'Server Error';
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
  res.status(status).json({ message });
};

