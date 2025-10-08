import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../utils/utils';

export const validate = (schema: ZodSchema<any>) => async (req: Request, _res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err: any) {
    const message = err?.errors?.[0]?.message || 'Validation error';
    next(new AppError(message, 400));
  }
};

