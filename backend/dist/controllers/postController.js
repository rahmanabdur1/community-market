"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.addComment = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const createPost = async (req, res) => {
    const post = new Post_1.default({ ...req.body, userId: req.user.id });
    await post.save();
    res.status(201).json(post);
};
exports.createPost = createPost;
const getPosts = async (req, res) => {
    const posts = await Post_1.default.find();
    res.json(posts);
};
exports.getPosts = getPosts;
const getPostById = async (req, res) => {
    const post = await Post_1.default.findById(req.params.id);
    if (!post)
        return res.status(404).json({ message: 'Post not found' });
    res.json(post);
};
exports.getPostById = getPostById;
const addComment = async (req, res) => {
    const post = await Post_1.default.findById(req.params.id);
    if (!post)
        return res.status(404).json({ message: 'Post not found' });
    post.comments.push({ userId: req.user.id, comment: req.body.comment, createdAt: new Date() });
    await post.save();
    res.json(post);
};
exports.addComment = addComment;
const deletePost = async (req, res) => {
    const post = await Post_1.default.findByIdAndDelete(req.params.id);
    if (!post)
        return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
};
exports.deletePost = deletePost;
//# sourceMappingURL=postController.js.map