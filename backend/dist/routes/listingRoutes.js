"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listingController_1 = require("../controllers/listingController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Public read/search
router.get('/', listingController_1.getListings);
router.get('/:id', listingController_1.getListingById);
router.get('/:id/availability', listingController_1.checkAvailability);
router.post('/', (0, authMiddleware_1.roleMiddleware)(['vendor']), listingController_1.createListing);
router.put('/:id', (0, authMiddleware_1.roleMiddleware)(['vendor', 'admin']), listingController_1.updateListing);
router.patch('/:id/approve', (0, authMiddleware_1.roleMiddleware)(['admin']), listingController_1.approveListing);
router.delete('/:id', (0, authMiddleware_1.roleMiddleware)(['admin']), listingController_1.deleteListing);
// Feature listing
router.patch('/:id/feature', (0, authMiddleware_1.roleMiddleware)(['admin']), async (req, res) => {
    const module = await Promise.resolve().then(() => __importStar(require('../models/Listing')));
    const Listing = module.default;
    const listing = await Listing.findById(req.params.id);
    if (!listing)
        return res.status(404).json({ message: 'Listing not found' });
    listing.featured = true;
    await listing.save();
    res.json(listing);
});
exports.default = router;
//# sourceMappingURL=listingRoutes.js.map