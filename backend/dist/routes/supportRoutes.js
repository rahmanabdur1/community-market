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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supportController_1 = require("../controllers/supportController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', supportController_1.createTicket);
router.get('/', (0, authMiddleware_1.roleMiddleware)(['admin']), supportController_1.getTickets);
router.get('/:id', supportController_1.getTicketById);
router.put('/:id', supportController_1.updateTicket);
// Change ticket status
router.patch('/:id/status', async (req, res) => {
    const module = await Promise.resolve().then(() => __importStar(require('../models/SupportTicket')));
    const SupportTicket = module.default;
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket)
        return res.status(404).json({ message: 'Ticket not found' });
    ticket.status = req.body.status;
    await ticket.save();
    res.json(ticket);
});
exports.default = router;
//# sourceMappingURL=supportRoutes.js.map