import { Request, Response } from 'express';
import Review from '../models/Review';

export const createReview = async (req: any, res: Response) => {
  const review = new Review({ ...req.body, userId: req.user.id });
  await review.save();
  res.status(201).json(review);
};

export const getReviews = async (req: Request, res: Response) => {
  const reviews = await Review.find();
  res.json(reviews);
};

export const getReviewById = async (req: Request, res: Response) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json(review);
};
