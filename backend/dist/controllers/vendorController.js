"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatus = exports.updateVendor = exports.getVendorById = exports.getVendors = exports.createVendor = void 0;
const Vendor_1 = __importDefault(require("../models/Vendor"));
const createVendor = async (req, res) => {
    const vendor = new Vendor_1.default(req.body);
    await vendor.save();
    res.status(201).json(vendor);
};
exports.createVendor = createVendor;
const getVendors = async (req, res) => {
    const vendors = await Vendor_1.default.find();
    res.json(vendors);
};
exports.getVendors = getVendors;
const getVendorById = async (req, res) => {
    const vendor = await Vendor_1.default.findById(req.params.id);
    if (!vendor)
        return res.status(404).json({ message: 'Vendor not found' });
    res.json(vendor);
};
exports.getVendorById = getVendorById;
const updateVendor = async (req, res) => {
    const vendor = await Vendor_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vendor)
        return res.status(404).json({ message: 'Vendor not found' });
    res.json(vendor);
};
exports.updateVendor = updateVendor;
const changeStatus = async (req, res) => {
    const vendor = await Vendor_1.default.findById(req.params.id);
    if (!vendor)
        return res.status(404).json({ message: 'Vendor not found' });
    vendor.status = req.body.status;
    await vendor.save();
    res.json(vendor);
};
exports.changeStatus = changeStatus;
//# sourceMappingURL=vendorController.js.map