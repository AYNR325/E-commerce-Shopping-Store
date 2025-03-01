/*// import  { createSlice, createAsyncThunk}  from "@reduxjs/toolkit";

// import axios from 'axios';

// export const paymentGateway=createAsyncThunk(
//     'payment/gateway',
//     async({cartItems})=>{
//         const response = await axios.post(
//             "http://localhost:3000/api/shop/order/checkout",
//             {
//                 cartItems
//             }
//           );

//           return response.data;
//     }
// )

// const orderSlice=createSlice({
//     name: 'order',
//     initialState: {
//         isLoading: false,
//         error: null,
//         success: false,
//         orderId: null,
//         orderStatus: null,
//         cartItems:[],
//         totalPrice: 0,
//         orderDetails: null
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//          .addCase(paymentGateway.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//                 state.success = false;
//             })
//             .addCase(paymentGateway.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.success = true;
//                 state.orderId = action.payload.orderId;
//                 state.orderStatus = action.payload.orderStatus;
//                 state.cartItems = action.payload.cartItems;
//                 state.totalPrice = action.payload.totalPrice;
//                 state.orderDetails = action.payload.orderDetails;
//                 state.error = null;
//                 console.log(state)

//                 // clear cart after successful checkout
//                 // dispatch(clearCart());
//                 // dispatch(fetchCartItems());
//             })
//             .addCase(paymentGateway.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.error.message;
//                 state.success = false;
//             })
//             //.addCase(clearCart.fulfilled, (state) => {
//                 // state.cartItems = [];
//                 // state.totalPrice = 0;
//                 // state.orderDetails = null;
//             //
//             // })
//     }

// })

// export default orderSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000/api';

// export const paymentGateway = createAsyncThunk(
//     'payment/gateway',
//     async ({ cartItems }, { rejectWithValue }) => {
//         try {
//             if (!Array.isArray(cartItems) || cartItems.length === 0) {
//                 throw new Error('Invalid cart items');
//             }

//             const response = await axios.post(
//                 `${API_BASE_URL}/shop/order/checkout`,
//                 { cartItems },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );

//             return response.data;
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 return rejectWithValue(error.response?.data || 'Network error occurred');
//             }
//             return rejectWithValue(error.message);
//         }
//     }
// );

// const initialState = {
//     isLoading: false,
//     error: null,
//     orderId: null,
//     orderStatus: null,
//     orderData: null  // Combined order details in one property
// };

// const orderSlice = createSlice({
//     name: 'order',
//     initialState,
//     reducers: {
//         resetOrderState: (state) => {
//             return initialState;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(paymentGateway.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(paymentGateway.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.orderId = action.payload.orderId;
//                 state.orderStatus = action.payload.orderStatus;
//                 state.orderData = {
//                     cartItems: action.payload.cartItems,
//                     totalPrice: action.payload.totalPrice,
//                     details: action.payload.orderDetails
//                 };
//                 state.error = null;
//             })
//             .addCase(paymentGateway.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload || 'An error occurred';
//             });
//     }
// });

// export const { resetOrderState } = orderSlice.actions;
// export default orderSlice.reducer; 
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/shop/order/create`, {
        formData,
      });
      return response.data;
      
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/shop/order/get/${userId}`
      );
      return response.data;
      
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/orderDetails",
  async (orderId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/shop/order/details/${orderId}`
      );
      return response.data;
      
    } catch (error) {
      console.log(error);
    }
  }
);

export const paymentGateway = createAsyncThunk(
  "payment/gateway",
  async ({ cartItems }, { rejectWithValue }) => {
    try {
      // Validate cartItems structure
      if (!Array.isArray(cartItems?.items) || cartItems.items.length === 0) {
        throw new Error("Invalid cart items");
      }

      const response = await axios.post(
        `${API_BASE_URL}/shop/order/checkout`,
        { cartItems },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error specifically
        return rejectWithValue(
          error.response?.data || "Network error occurred"
        );
      }
      // For other types of errors
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  error: null,
  orderData: null,
  orderId: null,
  orderList: [],
  orderDetails: null,

};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(paymentGateway.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(paymentGateway.fulfilled, (state, action) => {
        console.log("Payment URL:", action.payload.data.url);
        state.isLoading = false;
        // state.orderId = action.payload.orderId;
        // state.orderStatus = action.payload.orderStatus;
        state.orderData = {
          orderData: action.payload?.data || null,
        };
        state.error = null;
      })
      .addCase(paymentGateway.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred";
        state.orderId=null;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred";
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred";
        state.orderDetails = null;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
