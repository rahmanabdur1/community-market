"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authMiddleware = exports.roleMiddleware = exports.verifyToken = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else if (req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    }
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Not authorized, invalid token" });
    }
};
exports.protect = protect;
// Backwards-compatible alias names for routes expecting older exports
exports.verifyToken = exports.protect;
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.userRole || 'user';
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
exports.authMiddleware = exports.protect;
const isAdmin = (req, res, next) => {
    const userRole = req.userRole || 'user';
    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Admin only' });
    }
    next();
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=authMiddleware.js.map