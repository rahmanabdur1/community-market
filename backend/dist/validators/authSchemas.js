"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.verifyEmailSchema = exports.refreshSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        displayName: zod_1.z.string().min(2),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8),
    })
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8),
    })
});
exports.refreshSchema = zod_1.z.object({
    body: zod_1.z.object({
        refreshToken: zod_1.z.string().min(10),
    })
});
exports.verifyEmailSchema = zod_1.z.object({
    body: zod_1.z.object({ token: zod_1.z.string().min(10) })
});
exports.forgotPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({ email: zod_1.z.string().email() })
});
exports.resetPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        recoveryAccessToken: zod_1.z.string().min(10),
        newPassword: zod_1.z.string().min(8),
    })
});
//# sourceMappingURL=authSchemas.js.map