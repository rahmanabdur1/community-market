"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatus = exports.getPaymentById = exports.getPayments = exports.createPayment = void 0;
const Payment_1 = __importDefault(require("../models/Payment"));
const createPayment = async (req, res) => {
    const payment = new Payment_1.default({ ...req.body, userId: req.user.id });
    await payment.save();
    res.status(201).json(payment);
};
exports.createPayment = createPayment;
const getPayments = async (req, res) => {
    const payments = await Payment_1.default.find();
    res.json(payments);
};
exports.getPayments = getPayments;
const getPaymentById = async (req, res) => {
    const payment = await Payment_1.default.findById(req.params.id);
    if (!payment)
        return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
};
exports.getPaymentById = getPaymentById;
const updatePaymentStatus = async (req, res) => {
    const payment = await Payment_1.default.findById(req.params.id);
    if (!payment)
        return res.status(404).json({ message: 'Payment not found' });
    payment.status = req.body.status;
    await payment.save();
    res.json(payment);
};
exports.updatePaymentStatus = updatePaymentStatus;
//# sourceMappingURL=paymentController.js.map