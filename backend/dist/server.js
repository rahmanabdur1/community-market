"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
// Import Routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const vendorRoutes_1 = __importDefault(require("./routes/vendorRoutes"));
const listingRoutes_1 = __importDefault(require("./routes/listingRoutes"));
const marketplaceRoutes_1 = __importDefault(require("./routes/marketplaceRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const supportRoutes_1 = __importDefault(require("./routes/supportRoutes"));
const analyticsRoutes_1 = __importDefault(require("./routes/analyticsRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-API-KEY"], // include your custom header
    credentials: true, // if you want cookies
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/vendors', vendorRoutes_1.default);
app.use('/api/listings', listingRoutes_1.default);
app.use('/api/marketplace', marketplaceRoutes_1.default);
app.use('/api/bookings', bookingRoutes_1.default);
app.use('/api/payments', paymentRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/posts', postRoutes_1.default);
app.use('/api/reviews', reviewRoutes_1.default);
app.use('/api/support', supportRoutes_1.default);
app.use('/api/analytics', analyticsRoutes_1.default);
// Default route
app.get('/', (req, res) => {
    res.send('Community Booking & Marketplace API is running');
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map