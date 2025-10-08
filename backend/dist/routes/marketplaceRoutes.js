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
const marketplaceController_1 = require("../controllers/marketplaceController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', (0, authMiddleware_1.roleMiddleware)(['vendor']), marketplaceController_1.createItem);
router.get('/', marketplaceController_1.getItems);
router.get('/:id', marketplaceController_1.getItemById);
router.put('/:id', (0, authMiddleware_1.roleMiddleware)(['vendor', 'admin']), marketplaceController_1.updateItem);
router.patch('/:id/approve', (0, authMiddleware_1.roleMiddleware)(['admin']), marketplaceController_1.approveItem);
router.delete('/:id', (0, authMiddleware_1.roleMiddleware)(['admin']), marketplaceController_1.deleteItem);
// Feature marketplace item (optional MVP: mark featured)
router.patch('/:id/feature', (0, authMiddleware_1.roleMiddleware)(['admin']), async (req, res) => {
    const module = await Promise.resolve().then(() => __importStar(require('../models/MarketplaceItem')));
    const MarketplaceItem = module.default;
    const item = await MarketplaceItem.findById(req.params.id);
    if (!item)
        return res.status(404).json({ message: 'Item not found' });
    item.featured = true;
    await item.save();
    res.json(item);
});
exports.default = router;
//# sourceMappingURL=marketplaceRoutes.js.map