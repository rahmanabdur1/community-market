"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAnalytics = exports.verifyRefreshToken = exports.generateAccessToken = exports.verifyToken = exports.generateRefreshToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Analytics_1 = __importDefault(require("../models/Analytics"));
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refreshsecret';
const generateToken = (payload, expiresIn = '15m') => {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn });
};
exports.generateToken = generateToken;
const generateRefreshToken = (payload, expiresIn = '7d') => {
    return jsonwebtoken_1.default.sign(payload, REFRESH_SECRET, { expiresIn });
};
exports.generateRefreshToken = generateRefreshToken;
// export const generateToken = (
//   payload: object,
//   expiresIn: string = '1h'
// ): string => {
//   const options: SignOptions = { expiresIn };
//   return jwt.sign(payload, JWT_SECRET, options);
// };
// export const generateRefreshToken = (
//   payload: object,
//   expiresIn: string = '7d'
// ): string => {
//   const options: SignOptions = { expiresIn };
//   return jwt.sign(payload, REFRESH_SECRET, options);
// };
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (_err) {
        return null;
    }
};
exports.verifyToken = verifyToken;
const generateAccessToken = (payload, expiresIn = "1h") => {
    return (0, exports.generateToken)(payload, expiresIn);
};
exports.generateAccessToken = generateAccessToken;
const verifyRefreshToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
    }
    catch (_err) {
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
const logAnalytics = async (type, referenceId, action, extraData) => {
    try {
        const record = new Analytics_1.default({ type, referenceId, action, extraData });
        await record.save();
    }
    catch (err) {
        console.error('Analytics logging failed:', err);
    }
};
exports.logAnalytics = logAnalytics;
//# sourceMappingURL=utils.js.map