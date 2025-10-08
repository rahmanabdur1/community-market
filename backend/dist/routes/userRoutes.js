"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// ✅ Get all users
router.get("/", authMiddleware_1.protect, userController_1.getUsers);
// ✅ Get current logged-in user
router.get("/me", authMiddleware_1.protect, userController_1.getMe);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map