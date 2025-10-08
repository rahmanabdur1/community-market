

import { z } from "zod";

export const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(254, "Email is too long");

export const DisplayNameSchema = z
  .string()
  .trim()
  .min(2, "Display name must be at least 2 characters")
  .max(50, "Display name must be at most 50 characters")
  .regex(/^[\p{L}\p{N} .,'-]+$/u, "Use letters, numbers, spaces, and . , ' - only");

export const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password is too long")
  .regex(/[A-Z]/, "Add at least one uppercase letter")
  .regex(/[a-z]/, "Add at least one lowercase letter")
  .regex(/[0-9]/, "Add at least one number")
  .regex(/[^A-Za-z0-9]/, "Add at least one special character");

export const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  // rememberMe: z.boolean().default(false),
});

export const RegisterSchema = z
  .object({
    email: EmailSchema,
    displayName: DisplayNameSchema,
    password: PasswordSchema,
    passwordConfirm: z.string().min(1, "Please confirm your password"),
  
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

export const ForgotPasswordSchema = z.object({
  email: EmailSchema,
});

export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    new_password: PasswordSchema,
    confirm_password: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;


