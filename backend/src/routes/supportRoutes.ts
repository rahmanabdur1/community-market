import { Router } from 'express';
import { createTicket, getTickets, getTicketById, updateTicket } from '../controllers/supportController';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.post('/', createTicket);
router.get('/', roleMiddleware(['admin']), getTickets);
router.get('/:id', getTicketById);
router.put('/:id', updateTicket);
// Change ticket status
router.patch('/:id/status', async (req, res) => {
  const module = await import('../models/SupportTicket');
  const SupportTicket = module.default;
  const ticket = await SupportTicket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
  (ticket as any).status = req.body.status;
  await ticket.save();
  res.json(ticket);
});

export default router;
