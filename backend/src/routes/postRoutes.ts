import { Router } from 'express';
import { createPost, getPosts, getPostById, addComment } from '../controllers/postController';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.post('/', roleMiddleware(['customer', 'vendor']), createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/:id/comment', addComment);

export default router;
