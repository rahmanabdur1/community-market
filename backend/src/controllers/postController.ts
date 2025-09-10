import { Request, Response } from 'express';
import Post from '../models/Post';

export const createPost = async (req: any, res: Response) => {
  const post = new Post({ ...req.body, userId: req.user.id });
  await post.save();
  res.status(201).json(post);
};

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.json(posts);
};

export const getPostById = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

export const addComment = async (req: any, res: Response) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  post.comments.push({ userId: req.user.id, comment: req.body.comment, createdAt: new Date() });
  await post.save();
  res.json(post);
};

export const deletePost = async (req: any, res: Response) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json({ message: 'Post deleted' });
};