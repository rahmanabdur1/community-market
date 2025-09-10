import { Router } from 'express';
import { createReview, getReviews, getReviewById } from '../controllers/reviewController';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.post('/', roleMiddleware(['customer']), createReview);
router.get('/', getReviews);
router.get('/:id', getReviewById);

export default router;
