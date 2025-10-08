"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.updatePaymentStatus = exports.getPaymentById = exports.getPayments = exports.createPayment = void 0;
const Payment_1 = __importDefault(require("../models/Payment"));
const utils_1 = require("../utils/utils");
exports.createPayment = (0, utils_1.asyncHandler)(async (req, res) => {
    const { amount, method, bookingId, orderId } = req.body;
    const payment = new Payment_1.default({ userId: req.user.id, amount, method, bookingId, orderId, status: 'pending' });
    await payment.save();
    // Simulate provider session creation; in production call bKash/Nagad APIs
    res.status(201).json({
        paymentId: payment._id,
        redirectUrl: `/payments/${payment._id}/gateway/${method}`,
    });
});
exports.getPayments = (0, utils_1.asyncHandler)(async (_req, res) => {
    const payments = await Payment_1.default.find().lean();
    res.json(payments);
});
exports.getPaymentById = (0, utils_1.asyncHandler)(async (req, res) => {
    const payment = await Payment_1.default.findById(req.params.id).lean();
    if (!payment)
        throw new utils_1.AppError('Payment not found', 404);
    res.json(payment);
});
exports.updatePaymentStatus = (0, utils_1.asyncHandler)(async (req, res) => {
    const payment = await Payment_1.default.findById(req.params.id);
    if (!payment)
        throw new utils_1.AppError('Payment not found', 404);
    payment.status = req.body.status;
    await payment.save();
    res.json(payment);
});
exports.verifyPayment = (0, utils_1.asyncHandler)(async (req, res) => {
    const { paymentId, trxId } = req.body;
    const payment = await Payment_1.default.findById(paymentId);
    if (!payment)
        throw new utils_1.AppError('Payment not found', 404);
    payment.status = 'completed';
    payment.providerRef = trxId;
    await payment.save();
    res.json({ message: 'Payment verified', payment });
});
//# sourceMappingURL=paymentController.js.map