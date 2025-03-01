import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice/authSlice';
import AdminProductsSlice from './Admin/product-slice'
import shoppingProductSlice from "./shop/product-slice"
import shoppingCartSlice from "./shop/cart-slice"
import addressSlice from "./shop/address-slice"
import shopSearchSlice from "./shop/search-slice";
import commonSlice from "./common/index";
import orderSlice from "./shop/order-slice"
const store= configureStore(
    {
        reducer: {
            auth: authReducer,
            adminProducts: AdminProductsSlice, 
            shoppingProducts: shoppingProductSlice,
            shoppingCart: shoppingCartSlice,
            address: addressSlice,
            shopSearch: shopSearchSlice,
            commonFeature:commonSlice,
            order: orderSlice
        },
    }
)

export default store;