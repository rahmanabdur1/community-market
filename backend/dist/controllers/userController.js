"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select("-password"); // exclude password
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getUsers = getUsers;
// Get current logged-in user
const getMe = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user?.id).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getMe = getMe;
//# sourceMappingURL=userController.js.map