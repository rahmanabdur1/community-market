import { Request, Response } from 'express';
import SupportTicket from '../models/SupportTicket';

export const createTicket = async (req: any, res: Response) => {
  const ticket = new SupportTicket({ ...req.body, userId: req.user.id });
  await ticket.save();
  res.status(201).json(ticket);
};

export const getTickets = async (req: Request, res: Response) => {
  const tickets = await SupportTicket.find();
  res.json(tickets);
};

export const getTicketById = async (req: Request, res: Response) => {
  const ticket = await SupportTicket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
  res.json(ticket);
};

export const updateTicket = async (req: Request, res: Response) => {
  const ticket = await SupportTicket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
  res.json(ticket);
};
