"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Correct import
const paymentController_1 = require("../controllers/paymentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validate_1 = require("../middleware/validate");
const paymentSchemas_1 = require("../validators/paymentSchemas");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
// Manual payment confirmation endpoint per spec
router.post('/manual', (0, authMiddleware_1.roleMiddleware)(['customer', 'admin']), (0, validate_1.validate)(paymentSchemas_1.paymentInitSchema), paymentController_1.createPayment);
router.get('/', (0, authMiddleware_1.roleMiddleware)(['admin', 'vendor']), paymentController_1.getPayments);
router.get('/:id', paymentController_1.getPaymentById);
router.patch('/:id/status', (0, authMiddleware_1.roleMiddleware)(['admin']), paymentController_1.updatePaymentStatus);
router.post('/verify', (0, authMiddleware_1.roleMiddleware)(['customer', 'admin']), (0, validate_1.validate)(paymentSchemas_1.paymentVerifySchema), paymentController_1.verifyPayment);
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map