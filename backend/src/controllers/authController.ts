import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User, { IUser } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";
const JWT_EXPIRES_IN = "15m"; // 15 minutes
const JWT_REFRESH_EXPIRES_IN = "7d"; // 7 days

// 🔑 Generate Access & Refresh Tokens
const generateTokens = (user: IUser) => {
  const payload = { id: user._id, roles: user.roles } as any;
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
  return { accessToken, refreshToken, expiresIn: 900, tokenType: "Bearer" };
};

// ✍️ Signup Controller
export const signup = async (req: Request, res: Response) => {
  try {
    const { displayName, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const user = await User.create({ displayName, email, password, emailVerificationToken, emailVerified: false });

    res.status(201).json({
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        roles: user.roles,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      message: "Registration successful. Please verify your email.",
      verificationToken: emailVerificationToken,
    });
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

// ✅ Verify Email Controller
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token is required" });

    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.emailVerified = true;
    user.emailVerificationToken = null;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 📩 Forgot Password Controller
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: "If that account exists, we've sent instructions" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    // In production: send email with the token link
    res.json({ message: "Password reset token generated", token: resetToken });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 🔁 Reset Password Controller
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { recoveryAccessToken, newPassword } = req.body;
    if (!recoveryAccessToken || !newPassword) return res.status(400).json({ message: "Invalid request" });

    const user = await User.findOne({
      passwordResetToken: recoveryAccessToken,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired reset token" });

    user.password = newPassword;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    res.json({ message: "Password has been reset" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
