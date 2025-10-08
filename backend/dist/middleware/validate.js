"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const utils_1 = require("../utils/utils");
const validate = (schema) => async (req, _res, next) => {
    try {
        await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
        next();
    }
    catch (err) {
        const message = err?.errors?.[0]?.message || 'Validation error';
        next(new utils_1.AppError(message, 400));
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map