import { Router } from 'express';
import { login, refreshToken, logout, signup, verifyEmail, forgotPassword, resetPassword } from '../controllers/authController';

const router = Router();

router.post('/register', signup);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;