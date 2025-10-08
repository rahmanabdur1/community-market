import { Router } from "express";
import { getUsers, getMe } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// ✅ Get all users
router.get("/", protect, getUsers);

// ✅ Get current logged-in user
router.get("/me", protect, getMe);

export default router;
