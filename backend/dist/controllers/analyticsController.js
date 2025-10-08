"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = exports.logAction = void 0;
const Analytics_1 = __importDefault(require("../models/Analytics"));
const logAction = async (type, referenceId, action, extraData) => {
    const record = new Analytics_1.default({ type, referenceId, action, extraData });
    await record.save();
};
exports.logAction = logAction;
const getAnalytics = async (req, res) => {
    try {
        const { type, startDate, endDate } = req.query;
        const filter = {};
        if (type)
            filter.type = type;
        if (startDate || endDate)
            filter.timestamp = {};
        if (startDate)
            filter.timestamp.$gte = new Date(startDate);
        if (endDate)
            filter.timestamp.$lte = new Date(endDate);
        const analytics = await Analytics_1.default.find(filter).sort({ timestamp: -1 });
        res.json(analytics);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching analytics', error });
    }
};
exports.getAnalytics = getAnalytics;
//# sourceMappingURL=analyticsController.js.map