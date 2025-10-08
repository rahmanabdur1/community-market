"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const utils_1 = require("../utils/utils");
const notFound = (req, res, _next) => {
    res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
};
exports.notFound = notFound;
const errorHandler = (err, _req, res, _next) => {
    const status = err instanceof utils_1.AppError ? err.statusCode : err.statusCode || 500;
    const message = err.message || 'Server Error';
    if (process.env.NODE_ENV !== 'production') {
        console.error(err);
    }
    res.status(status).json({ message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map