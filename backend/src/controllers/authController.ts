import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";
const JWT_EXPIRES_IN = "15m"; // 15 minutes
const JWT_REFRESH_EXPIRES_IN = "7d"; // 7 days

// 🔑 Generate Access & Refresh Tokens
const generateTokens = (user: IUser) => {
  const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
  return { accessToken, refreshToken, expiresIn: 900, tokenType: "Bearer" };
};

// ✍️ Signup Controller
export const signup = async (req: Request, res: Response) => {
  try {
    const { displayName, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ displayName, email, password });
    res.status(201).json({ user, message: "Registration successful" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 🔐 Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const tokens = generateTokens(user);
    res.json({
      ...tokens,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        roles: user.roles,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 🔄 Refresh Token Controller
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

    jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err:any, decoded: any) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });

      const user = await User.findById(decoded.id);
      if (!user) return res.status(401).json({ message: "User not found" });

      const tokens = generateTokens(user);
      res.json(tokens);
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 🚪 Logout Controller
export const logout = async (req: Request, res: Response) => {
  try {
    // Optional: blacklist the refresh token in DB/Redis
    res.json({ message: "Logged out successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
