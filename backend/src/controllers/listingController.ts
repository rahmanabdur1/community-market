import { Request, Response } from 'express';
import Listing from '../models/Listing';

export const createListing = async (req: any, res: Response) => {
  const listing = new Listing({ ...req.body, ownerId: req.user.id });
  await listing.save();
  res.status(201).json(listing);
};

export const getListings = async (req: Request, res: Response) => {
  const listings = await Listing.find();
  res.json(listings);
};

export const getListingById = async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: 'Listing not found' });
  res.json(listing);
};

export const updateListing = async (req: Request, res: Response) => {
  const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!listing) return res.status(404).json({ message: 'Listing not found' });
  res.json(listing);
};

export const approveListing = async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: 'Listing not found' });
  listing.status = req.body.status;
  await listing.save();
  res.json(listing);
};

export const deleteListing = async (req: Request, res: Response) => {
  const listing = await Listing.findByIdAndDelete(req.params.id);
  if (!listing) return res.status(404).json({ message: 'Listing not found' });
  res.json({ message: 'Listing deleted successfully' });
};
