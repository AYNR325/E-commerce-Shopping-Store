const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express()
const port = 3000
const authRouter=require('./routes/auth/auth-routes');
const adminProductsRouter=require("./routes/admin/products-routes")
const shopProductRouter=require("./routes/shop/products-routes")
const shopCartRouter=require("./routes/shop/cart-routes");
const shopAddressRouter=require("./routes/shop/address-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");
const shopOrderRouter = require("./routes/shop/order-routes");

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error(err));

app.use(cors(
    {
        origin:'http://localhost:5173',
        methods:['GET', 'POST','DELETE','PUT'],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials:true
    }
))
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/admin/products",adminProductsRouter);
app.use("/api/shop/products",shopProductRouter);
app.use("/api/shop/cart",shopCartRouter);
app.use("/api/shop/address",shopAddressRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/common/feature", commonFeatureRouter);
app.use("/api/shop/order", shopOrderRouter);

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})