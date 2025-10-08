"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicket = exports.getTicketById = exports.getTickets = exports.createTicket = void 0;
const SupportTicket_1 = __importDefault(require("../models/SupportTicket"));
const createTicket = async (req, res) => {
    const ticket = new SupportTicket_1.default({ ...req.body, userId: req.user.id });
    await ticket.save();
    res.status(201).json(ticket);
};
exports.createTicket = createTicket;
const getTickets = async (req, res) => {
    const tickets = await SupportTicket_1.default.find();
    res.json(tickets);
};
exports.getTickets = getTickets;
const getTicketById = async (req, res) => {
    const ticket = await SupportTicket_1.default.findById(req.params.id);
    if (!ticket)
        return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
};
exports.getTicketById = getTicketById;
const updateTicket = async (req, res) => {
    const ticket = await SupportTicket_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ticket)
        return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
};
exports.updateTicket = updateTicket;
//# sourceMappingURL=supportController.js.map