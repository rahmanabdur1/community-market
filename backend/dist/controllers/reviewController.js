"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewById = exports.getReviews = exports.createReview = void 0;
const Review_1 = __importDefault(require("../models/Review"));
const createReview = async (req, res) => {
    const review = new Review_1.default({ ...req.body, userId: req.user.id });
    await review.save();
    res.status(201).json(review);
};
exports.createReview = createReview;
const getReviews = async (req, res) => {
    const reviews = await Review_1.default.find();
    res.json(reviews);
};
exports.getReviews = getReviews;
const getReviewById = async (req, res) => {
    const review = await Review_1.default.findById(req.params.id);
    if (!review)
        return res.status(404).json({ message: 'Review not found' });
    res.json(review);
};
exports.getReviewById = getReviewById;
//# sourceMappingURL=reviewController.js.map