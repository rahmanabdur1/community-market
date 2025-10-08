"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendorController_1 = require("../controllers/vendorController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', (0, authMiddleware_1.roleMiddleware)(['admin']), vendorController_1.createVendor);
router.get('/', vendorController_1.getVendors);
router.get('/:id', vendorController_1.getVendorById);
router.put('/:id', (0, authMiddleware_1.roleMiddleware)(['admin', 'vendor']), vendorController_1.updateVendor);
router.patch('/:id/status', (0, authMiddleware_1.roleMiddleware)(['admin']), vendorController_1.changeStatus);
exports.default = router;
//# sourceMappingURL=vendorRoutes.js.map