"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.approveItem = exports.updateItem = exports.getItemById = exports.getItems = exports.createItem = void 0;
const MarketplaceItem_1 = __importDefault(require("../models/MarketplaceItem"));
const createItem = async (req, res) => {
    const item = new MarketplaceItem_1.default({ ...req.body, vendorId: req.user.id });
    await item.save();
    res.status(201).json(item);
};
exports.createItem = createItem;
const getItems = async (req, res) => {
    const items = await MarketplaceItem_1.default.find();
    res.json(items);
};
exports.getItems = getItems;
const getItemById = async (req, res) => {
    const item = await MarketplaceItem_1.default.findById(req.params.id);
    if (!item)
        return res.status(404).json({ message: 'Item not found' });
    res.json(item);
};
exports.getItemById = getItemById;
const updateItem = async (req, res) => {
    const item = await MarketplaceItem_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item)
        return res.status(404).json({ message: 'Item not found' });
    res.json(item);
};
exports.updateItem = updateItem;
const approveItem = async (req, res) => {
    const item = await MarketplaceItem_1.default.findById(req.params.id);
    if (!item)
        return res.status(404).json({ message: 'Item not found' });
    item.status = req.body.status;
    await item.save();
    res.json(item);
};
exports.approveItem = approveItem;
const deleteItem = async (req, res) => {
    const item = await MarketplaceItem_1.default.findByIdAndDelete(req.params.id);
    if (!item)
        return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=marketplaceController.js.map