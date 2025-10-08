"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.updateBooking = exports.getBookingById = exports.getBookings = exports.createBooking = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const utils_1 = require("../utils/utils");
exports.createBooking = (0, utils_1.asyncHandler)(async (req, res) => {
    const booking = new Booking_1.default({ ...req.body, userId: req.user.id });
    await booking.save();
    res.status(201).json(booking);
});
exports.getBookings = (0, utils_1.asyncHandler)(async (_req, res) => {
    const bookings = await Booking_1.default.find().lean();
    res.json(bookings);
});
exports.getBookingById = (0, utils_1.asyncHandler)(async (req, res) => {
    const booking = await Booking_1.default.findById(req.params.id).lean();
    if (!booking)
        throw new utils_1.AppError('Booking not found', 404);
    res.json(booking);
});
exports.updateBooking = (0, utils_1.asyncHandler)(async (req, res) => {
    const booking = await Booking_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking)
        throw new utils_1.AppError('Booking not found', 404);
    res.json(booking);
});
exports.cancelBooking = (0, utils_1.asyncHandler)(async (req, res) => {
    const booking = await Booking_1.default.findById(req.params.id);
    if (!booking)
        throw new utils_1.AppError('Booking not found', 404);
    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
});
//# sourceMappingURL=bookingController.js.map