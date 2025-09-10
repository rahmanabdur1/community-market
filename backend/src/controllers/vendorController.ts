import { Request, Response } from 'express';
import Vendor from '../models/Vendor';

export const createVendor = async (req: Request, res: Response) => {
  const vendor = new Vendor(req.body);
  await vendor.save();
  res.status(201).json(vendor);
};

export const getVendors = async (req: Request, res: Response) => {
  const vendors = await Vendor.find();
  res.json(vendors);
};

export const getVendorById = async (req: Request, res: Response) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
  res.json(vendor);
};

export const updateVendor = async (req: Request, res: Response) => {
  const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
  res.json(vendor);
};

export const changeStatus = async (req: Request, res: Response) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
  vendor.status = req.body.status;
  await vendor.save();
  res.json(vendor);
};
