"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const hpp_1 = __importDefault(require("hpp"));
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
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-API-KEY"],
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
}));
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, hpp_1.default)());
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
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map