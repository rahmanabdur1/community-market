"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.updateBooking = exports.getBookingById = exports.getBookings = exports.createBooking = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const createBooking = async (req, res) => {
    const booking = new Booking_1.default({ ...req.body, userId: req.user.id });
    await booking.save();
    res.status(201).json(booking);
};
exports.createBooking = createBooking;
const getBookings = async (req, res) => {
    const bookings = await Booking_1.default.find();
    res.json(bookings);
};
exports.getBookings = getBookings;
const getBookingById = async (req, res) => {
    const booking = await Booking_1.default.findById(req.params.id);
    if (!booking)
        return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
};
exports.getBookingById = getBookingById;
const updateBooking = async (req, res) => {
    const booking = await Booking_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking)
        return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
};
exports.updateBooking = updateBooking;
const cancelBooking = async (req, res) => {
    const booking = await Booking_1.default.findById(req.params.id);
    if (!booking)
        return res.status(404).json({ message: 'Booking not found' });
    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
};
exports.cancelBooking = cancelBooking;
//# sourceMappingURL=bookingController.js.map