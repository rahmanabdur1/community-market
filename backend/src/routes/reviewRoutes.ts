import { Router } from 'express';
import { createReview, getReviews, getReviewById } from '../controllers/reviewController';
import { roleMiddleware } from '../middleware/authMiddleware';

const router = Router();


router.post('/', roleMiddleware(['customer']), createReview);
router.get('/', getReviews);
router.get('/:id', getReviewById);
// Delete review per spec
router.delete('/:id', roleMiddleware(['admin']), async (req, res) => {
  const module = await import('../models/Review');
  const Review = module.default;
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json({ message: 'Review deleted' });
});

export default router;
