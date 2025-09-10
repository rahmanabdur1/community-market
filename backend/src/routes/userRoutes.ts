import { Router } from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.get('/', roleMiddleware(['admin']), getUsers);
router.get('/:id', roleMiddleware(['admin', 'vendor']), getUserById);
router.put('/:id', roleMiddleware(['admin', 'vendor']), updateUser);
router.delete('/:id', roleMiddleware(['admin']), deleteUser);

export default router;
