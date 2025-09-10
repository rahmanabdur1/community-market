import { Request, Response } from 'express';
import MarketplaceItem from '../models/MarketplaceItem';

export const createItem = async (req: any, res: Response) => {
  const item = new MarketplaceItem({ ...req.body, vendorId: req.user.id });
  await item.save();
  res.status(201).json(item);
};

export const getItems = async (req: Request, res: Response) => {
  const items = await MarketplaceItem.find();
  res.json(items);
};

export const getItemById = async (req: Request, res: Response) => {
  const item = await MarketplaceItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
};

export const updateItem = async (req: Request, res: Response) => {
  const item = await MarketplaceItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
};

export const approveItem = async (req: Request, res: Response) => {
  const item = await MarketplaceItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  item.status = req.body.status;
  await item.save();
  res.json(item);
};

export const deleteItem = async (req: Request, res: Response) => {
  const item = await MarketplaceItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json({ message: 'Item deleted successfully' });
};
