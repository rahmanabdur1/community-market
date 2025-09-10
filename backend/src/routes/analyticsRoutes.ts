import { Router } from 'express';
import { getAnalytics } from '../controllers/analyticsController';
import { verifyToken, isAdmin } from '../middleware/authMiddleware';

const router = Router();

// Admin-only route to fetch analytics
router.get('/', verifyToken, isAdmin, getAnalytics);

export default router;
