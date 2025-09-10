import { Router } from 'express';
import { createListing, getListings, getListingById, updateListing, approveListing, deleteListing } from '../controllers/listingController';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.post('/', roleMiddleware(['vendor']), createListing);
router.get('/', getListings);
router.get('/:id', getListingById);
router.put('/:id', roleMiddleware(['vendor', 'admin']), updateListing);
router.patch('/:id/approve', roleMiddleware(['admin']), approveListing);
router.delete('/:id', roleMiddleware(['admin']), deleteListing);

export default router;
