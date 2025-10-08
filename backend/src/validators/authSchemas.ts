import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    displayName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(10),
  })
});

export const verifyEmailSchema = z.object({
  body: z.object({ token: z.string().min(10) })
});

export const forgotPasswordSchema = z.object({
  body: z.object({ email: z.string().email() })
});

export const resetPasswordSchema = z.object({
  body: z.object({
    recoveryAccessToken: z.string().min(10),
    newPassword: z.string().min(8),
  })
});

