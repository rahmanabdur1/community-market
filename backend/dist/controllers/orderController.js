"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const createOrder = async (req, res) => {
    const order = new Order_1.default({ ...req.body, userId: req.user.id });
    await order.save();
    res.status(201).json(order);
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    const orders = await Order_1.default.find();
    res.json(orders);
};
exports.getOrders = getOrders;
const getOrderById = async (req, res) => {
    const order = await Order_1.default.findById(req.params.id);
    if (!order)
        return res.status(404).json({ message: 'Order not found' });
    res.json(order);
};
exports.getOrderById = getOrderById;
const updateOrderStatus = async (req, res) => {
    const order = await Order_1.default.findById(req.params.id);
    if (!order)
        return res.status(404).json({ message: 'Order not found' });
    order.status = req.body.status;
    await order.save();
    res.json(order);
};
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=orderController.js.map