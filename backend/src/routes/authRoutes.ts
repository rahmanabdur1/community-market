import { Router } from 'express';
import { login, refreshToken, logout, signup, verifyEmail, forgotPassword, resetPassword } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema, refreshSchema, verifyEmailSchema, forgotPasswordSchema, resetPasswordSchema } from '../validators/authSchemas';

const router = Router();

router.post('/register', validate(registerSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/refresh-token', validate(refreshSchema), refreshToken);
router.post('/logout', logout);
router.post('/verify-email', validate(verifyEmailSchema), verifyEmail);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

export default router;