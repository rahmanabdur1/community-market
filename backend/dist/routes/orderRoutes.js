"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', (0, authMiddleware_1.roleMiddleware)(['customer']), orderController_1.createOrder);
router.get('/', (0, authMiddleware_1.roleMiddleware)(['admin', 'vendor']), orderController_1.getOrders);
router.get('/:id', orderController_1.getOrderById);
router.patch('/:id/status', (0, authMiddleware_1.roleMiddleware)(['admin']), orderController_1.updateOrderStatus);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map