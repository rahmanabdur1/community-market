"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.verifyEmail = exports.logout = exports.refreshToken = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";
const JWT_EXPIRES_IN = "15m"; // 15 minutes
const JWT_REFRESH_EXPIRES_IN = "7d"; // 7 days
// 🔑 Generate Access & Refresh Tokens
const generateTokens = (user) => {
    const payload = { id: user._id, roles: user.roles };
    const accessToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
    return { accessToken, refreshToken, expiresIn: 900, tokenType: "Bearer" };
};
// ✍️ Signup Controller
const signup = async (req, res) => {
    try {
        const { displayName, email, password } = req.body;
        const exists = await User_1.default.findOne({ email });
        if (exists)
            return res.status(400).json({ message: "Email already exists" });
        const emailVerificationToken = crypto_1.default.randomBytes(32).toString("hex");
        const user = await User_1.default.create({ displayName, email, password, emailVerificationToken, emailVerified: false });
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
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.signup = signup;
// 🔐 Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });
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
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.login = login;
// 🔄 Refresh Token Controller
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken)
            return res.status(401).json({ message: "No refresh token provided" });
        jsonwebtoken_1.default.verify(refreshToken, JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err)
                return res.status(403).json({ message: "Invalid refresh token" });
            const user = await User_1.default.findById(decoded.id);
            if (!user)
                return res.status(401).json({ message: "User not found" });
            const tokens = generateTokens(user);
            res.json(tokens);
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.refreshToken = refreshToken;
// 🚪 Logout Controller
const logout = async (req, res) => {
    try {
        // Optional: blacklist the refresh token in DB/Redis
        res.json({ message: "Logged out successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.logout = logout;
// ✅ Verify Email Controller
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token)
            return res.status(400).json({ message: "Token is required" });
        const user = await User_1.default.findOne({ emailVerificationToken: token });
        if (!user)
            return res.status(400).json({ message: "Invalid or expired token" });
        user.emailVerified = true;
        user.emailVerificationToken = null;
        await user.save();
        res.json({ message: "Email verified successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.verifyEmail = verifyEmail;
// 📩 Forgot Password Controller
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(200).json({ message: "If that account exists, we've sent instructions" });
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await user.save();
        // In production: send email with the token link
        res.json({ message: "Password reset token generated", token: resetToken });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.forgotPassword = forgotPassword;
// 🔁 Reset Password Controller
const resetPassword = async (req, res) => {
    try {
        const { recoveryAccessToken, newPassword } = req.body;
        if (!recoveryAccessToken || !newPassword)
            return res.status(400).json({ message: "Invalid request" });
        const user = await User_1.default.findOne({
            passwordResetToken: recoveryAccessToken,
            passwordResetExpires: { $gt: new Date() },
        });
        if (!user)
            return res.status(400).json({ message: "Invalid or expired reset token" });
        user.password = newPassword;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        await user.save();
        res.json({ message: "Password has been reset" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=authController.js.map