import { Router } from 'express';
import { createListing, getListings, getListingById, updateListing, approveListing, deleteListing, checkAvailability } from '../controllers/listingController';
import {  roleMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public read/search
router.get('/', getListings);
router.get('/:id', getListingById);
router.get('/:id/availability', checkAvailability);


router.post('/', roleMiddleware(['vendor']), createListing);
router.put('/:id', roleMiddleware(['vendor', 'admin']), updateListing);
router.patch('/:id/approve', roleMiddleware(['admin']), approveListing);
router.delete('/:id', roleMiddleware(['admin']), deleteListing);
// Feature listing
router.patch('/:id/feature', roleMiddleware(['admin']), async (req, res) => {
  const module = await import('../models/Listing');
  const Listing = module.default;
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: 'Listing not found' });
  (listing as any).featured = true;
  await listing.save();
  res.json(listing);
});

export default router;
