import { Router } from 'express';
import { createVendor, getVendors, getVendorById, updateVendor, changeStatus } from '../controllers/vendorController';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.post('/', roleMiddleware(['admin']), createVendor);
router.get('/', getVendors);
router.get('/:id', getVendorById);
router.put('/:id', roleMiddleware(['admin', 'vendor']), updateVendor);
router.patch('/:id/status', roleMiddleware(['admin']), changeStatus);

export default router;
