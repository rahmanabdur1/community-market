import { Router } from 'express';
import { createItem, getItems, getItemById, updateItem, approveItem, deleteItem } from '../controllers/marketplaceController';
import {roleMiddleware } from '../middleware/authMiddleware';

const router = Router();


router.post('/', roleMiddleware(['vendor']), createItem);
router.get('/', getItems);
router.get('/:id', getItemById);
router.put('/:id', roleMiddleware(['vendor', 'admin']), updateItem);
router.patch('/:id/approve', roleMiddleware(['admin']), approveItem);
router.delete('/:id', roleMiddleware(['admin']), deleteItem);
// Feature marketplace item (optional MVP: mark featured)
router.patch('/:id/feature', roleMiddleware(['admin']), async (req, res) => {
  const module = await import('../models/MarketplaceItem');
  const MarketplaceItem = module.default;
  const item = await MarketplaceItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  (item as any).featured = true;
  await item.save();
  res.json(item);
});

export default router;
