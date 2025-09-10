import { Router } from 'express';
import { register, login, refreshToken, logout, forgotPassword, resetPassword, verify } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/token', refreshToken);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify', verify);

export default router;
