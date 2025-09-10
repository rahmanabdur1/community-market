import { Router } from 'express';
import { createTicket, getTickets, getTicketById, updateTicket } from '../controllers/supportController';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.post('/', createTicket);
router.get('/', roleMiddleware(['admin']), getTickets);
router.get('/:id', getTicketById);
router.put('/:id', updateTicket);

export default router;
