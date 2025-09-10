import { Router } from 'express';
import { createItem, getItems, getItemById, updateItem, approveItem, deleteItem } from '../controllers/marketplaceController';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.post('/', roleMiddleware(['vendor']), createItem);
router.get('/', getItems);
router.get('/:id', getItemById);
router.put('/:id', roleMiddleware(['vendor', 'admin']), updateItem);
router.patch('/:id/approve', roleMiddleware(['admin']), approveItem);
router.delete('/:id', roleMiddleware(['admin']), deleteItem);

export default router;
