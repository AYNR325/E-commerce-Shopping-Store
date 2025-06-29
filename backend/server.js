require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000
const authRouter=require('./routes/auth/auth-routes');
const adminProductsRouter=require("./routes/admin/products-routes")
const shopProductRouter=require("./routes/shop/products-routes")
const shopCartRouter=require("./routes/shop/cart-routes");
const shopAddressRouter=require("./routes/shop/address-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error(err));

// CORS configuration - Allow both localhost and deployed domains
const allowedOrigins = [
    'http://localhost:5173', // Development - Frontend running on port 3001
    'https://e-commerce-shopping-store-roan.vercel.app', // Replace with your actual Vercel domain
    'https://e-commerce-shopping-store-1.onrender.com', // Replace with your actual Render domain
    process.env.CLIENT_BASE_URL // From environment variable
].filter(Boolean);

app.use(cors(
    {
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                console.log('CORS blocked origin:', origin);
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
            "stripe-signature"
        ],
        credentials: true
    }
));

// Handle raw body for Stripe webhook
app.use((req, res, next) => {
    if (req.originalUrl === '/api/shop/order/webhook') {
        // Skip body parsing for webhook route
        next();
    } else {
        // Parse JSON for all other routes
        express.json()(req, res, next);
    }
});

app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/admin/products",adminProductsRouter);
app.use("/api/shop/products",shopProductRouter);
app.use("/api/shop/cart",shopCartRouter);
app.use("/api/shop/address",shopAddressRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/common/feature", commonFeatureRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/review", shopReviewRouter);
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})