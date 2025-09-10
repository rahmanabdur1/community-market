import { Request, Response } from 'express';
import Order from '../models/Order';

export const createOrder = async (req: any, res: Response) => {
  const order = new Order({ ...req.body, userId: req.user.id });
  await order.save();
  res.status(201).json(order);
};

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.find();
  res.json(orders);
};

export const getOrderById = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.status = req.body.status;
  await order.save();
  res.json(order);
};
