"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', (0, authMiddleware_1.roleMiddleware)(['customer', 'vendor']), postController_1.createPost);
router.get('/', postController_1.getPosts);
router.get('/:id', postController_1.getPostById);
router.post('/:id/comment', postController_1.addComment);
// Approve post (admin)
router.patch('/:id/approve', (0, authMiddleware_1.roleMiddleware)(['admin']), async (req, res) => {
    const module = await Promise.resolve().then(() => __importStar(require('../models/Post')));
    const Post = module.default;
    const post = await Post.findById(req.params.id);
    if (!post)
        return res.status(404).json({ message: 'Post not found' });
    post.status = req.body.status || 'approved';
    await post.save();
    res.json(post);
});
// Delete post (admin)
router.delete('/:id', (0, authMiddleware_1.roleMiddleware)(['admin']), postController_1.deletePost);
exports.default = router;
//# sourceMappingURL=postRoutes.js.map