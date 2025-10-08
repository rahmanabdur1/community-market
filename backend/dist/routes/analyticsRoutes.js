"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyticsController_1 = require("../controllers/analyticsController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Admin-only route to fetch analytics
router.get('/', authMiddleware_1.verifyToken, authMiddleware_1.isAdmin, analyticsController_1.getAnalytics);
exports.default = router;
//# sourceMappingURL=analyticsRoutes.js.map