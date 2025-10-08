"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAvailability = exports.deleteListing = exports.approveListing = exports.updateListing = exports.getListingById = exports.getListings = exports.createListing = void 0;
const Listing_1 = __importDefault(require("../models/Listing"));
const utils_1 = require("../utils/utils");
exports.createListing = (0, utils_1.asyncHandler)(async (req, res) => {
    const listing = new Listing_1.default({ ...req.body, ownerId: req.user.id });
    await listing.save();
    res.status(201).json(listing);
});
exports.getListings = (0, utils_1.asyncHandler)(async (req, res) => {
    const { q, location } = req.query;
    const filter = {};
    if (q)
        filter.title = { $regex: q, $options: 'i' };
    if (location)
        filter.location = { $regex: location, $options: 'i' };
    const listings = await Listing_1.default.find(filter).lean();
    res.json(listings);
});
exports.getListingById = (0, utils_1.asyncHandler)(async (req, res) => {
    const listing = await Listing_1.default.findById(req.params.id).lean();
    if (!listing)
        throw new utils_1.AppError('Listing not found', 404);
    res.json(listing);
});
exports.updateListing = (0, utils_1.asyncHandler)(async (req, res) => {
    const listing = await Listing_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!listing)
        throw new utils_1.AppError('Listing not found', 404);
    res.json(listing);
});
exports.approveListing = (0, utils_1.asyncHandler)(async (req, res) => {
    const listing = await Listing_1.default.findById(req.params.id);
    if (!listing)
        throw new utils_1.AppError('Listing not found', 404);
    listing.status = req.body.status;
    await listing.save();
    res.json(listing);
});
exports.deleteListing = (0, utils_1.asyncHandler)(async (req, res) => {
    const listing = await Listing_1.default.findByIdAndDelete(req.params.id);
    if (!listing)
        throw new utils_1.AppError('Listing not found', 404);
    res.json({ message: 'Listing deleted successfully' });
});
// Check availability by date (available if no confirmed or pending booking exists for that date)
exports.checkAvailability = (0, utils_1.asyncHandler)(async (req, res) => {
    const { date } = req.query;
    if (!date)
        return res.status(400).json({ message: 'date query param is required' });
    const targetDate = new Date(date);
    const Booking = (await Promise.resolve().then(() => __importStar(require('../models/Booking')))).default;
    const existing = await Booking.findOne({ listingId: req.params.id, date: targetDate, status: { $in: ['pending', 'confirmed'] } });
    res.json({ available: !existing });
});
//# sourceMappingURL=listingController.js.map