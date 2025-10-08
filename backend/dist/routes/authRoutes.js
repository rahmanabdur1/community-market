"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validate_1 = require("../middleware/validate");
const authSchemas_1 = require("../validators/authSchemas");
const router = (0, express_1.Router)();
router.post('/register', (0, validate_1.validate)(authSchemas_1.registerSchema), authController_1.signup);
router.post('/login', (0, validate_1.validate)(authSchemas_1.loginSchema), authController_1.login);
router.post('/refresh-token', (0, validate_1.validate)(authSchemas_1.refreshSchema), authController_1.refreshToken);
router.post('/logout', authController_1.logout);
router.post('/verify-email', (0, validate_1.validate)(authSchemas_1.verifyEmailSchema), authController_1.verifyEmail);
router.post('/forgot-password', (0, validate_1.validate)(authSchemas_1.forgotPasswordSchema), authController_1.forgotPassword);
router.post('/reset-password', (0, validate_1.validate)(authSchemas_1.resetPasswordSchema), authController_1.resetPassword);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map