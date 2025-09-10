import { Router } from 'express';
import { createPost, getPosts, getPostById, addComment, deletePost } from '../controllers/postController';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.post('/', roleMiddleware(['customer', 'vendor']), createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/:id/comment', addComment);
// Approve post (admin)
router.patch('/:id/approve', roleMiddleware(['admin']), async (req, res) => {
  const module = await import('../models/Post');
  const Post = module.default;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  (post as any).status = req.body.status || 'approved';
  await post.save();
  res.json(post);
});
// Delete post (admin)
router.delete('/:id', roleMiddleware(['admin']), deletePost);

export default router;
