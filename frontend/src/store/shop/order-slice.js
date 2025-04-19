import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCart } from "./cart-slice"; // Import the clearCart action

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Get all orders (with optional userId filter for customer vs admin view)
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async ({userId}, { rejectWithValue }) => {
    try {
      // If userId is provided, get orders for that user, otherwise get all orders (admin view)
      const url = userId 
        ? `${API_URL}/api/shop/order/get/${userId}`
        : `${API_URL}/api/shop/order/all`;
        
      console.log("Fetching orders from:", url);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Network error occurred");
      }
      return rejectWithValue(error.message);
    }
  }
);

// Get order details
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async ({orderId}, { rejectWithValue }) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        return rejectWithValue("Authentication token not found. Please log in again.");
      }
      
      console.log(`Fetching order details for ID: ${orderId} with token`);
      
      const response = await axios.get(`${API_URL}/api/shop/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true // Include cookies in the request
      });
      
      return response.data;
    } catch (error) {
      console.error("Error fetching order details:", error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        return rejectWithValue("Authentication failed. Please log in again.");
      }
      
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Network error occurred");
      }
      return rejectWithValue(error.message);
    }
  }
);

// Payment gateway
export const paymentGateway = createAsyncThunk(
  "order/paymentGateway",
  async (paymentData, { rejectWithValue }) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        return rejectWithValue("Authentication token not found. Please log in again.");
      }
      
      console.log("Using token for payment:", token ? "Token exists" : "No token");
      
      const response = await axios.post(`${API_URL}/api/shop/order/checkout`, paymentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        withCredentials: true // Include cookies in the request
      });
      
      return response.data;
    } catch (error) {
      console.error("Payment gateway error:", error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        return rejectWithValue("Authentication failed. Please log in again.");
      }
      
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Network error occurred");
      }
      return rejectWithValue(error.message);
    }
  }
);

// Update order status (admin function)
export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/shop/order/${orderId}/status`,
        { orderStatus },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update order status'
      );
    }
  }
);

// Update payment status (admin function)
export const updatePaymentStatus = createAsyncThunk(
  'order/updatePaymentStatus',
  async ({ orderId, paymentStatus }, { rejectWithValue }) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        return rejectWithValue("Authentication token not found. Please log in again.");
      }
      
      console.log(`Updating payment status for order ${orderId} to ${paymentStatus}`);
      
      const response = await axios.put(
        `${API_URL}/api/shop/order/${orderId}/payment-status`,
        { paymentStatus },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error updating payment status:", error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        return rejectWithValue("Authentication failed. Please log in again.");
      }
      
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update payment status'
      );
    }
  }
);

const initialState = {
  orderList: [],
  orderDetails: null,
  isLoading: false,
  error: null,
  paymentUrl: null
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    },
    clearPaymentUrl: (state) => {
      state.paymentUrl = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.orders || [];
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred";
      })
      
      // Get Order Details
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.order;
        
        // Ensure addressInfo is always an object with default values
        if (state.orderDetails && (!state.orderDetails.addressInfo || Object.keys(state.orderDetails.addressInfo).length === 0)) {
          state.orderDetails.addressInfo = {
            addressId: '',
            address: 'Default Address',
            city: 'Default City',
            state: 'Default State',
            country: 'Default Country',
            pincode: '000000',
            phone: '0000000000'
          };
        }
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred";
      })
      
      // Payment Gateway
      .addCase(paymentGateway.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(paymentGateway.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentUrl = action.payload.url;
      })
      .addCase(paymentGateway.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred";
      })
      
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the order in the orderList
        if (state.orderList) {
          state.orderList = state.orderList.map(order => 
            order._id === action.payload.order._id ? action.payload.order : order
          );
        }
        // Update the orderDetails if it matches the updated order
        if (state.orderDetails && state.orderDetails._id === action.payload.order._id) {
          state.orderDetails = action.payload.order;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update Payment Status
      .addCase(updatePaymentStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the order in the orderList
        if (state.orderList) {
          state.orderList = state.orderList.map(order => 
            order._id === action.payload.order._id ? action.payload.order : order
          );
        }
        // Update the orderDetails if it matches the updated order
        if (state.orderDetails && state.orderDetails._id === action.payload.order._id) {
          state.orderDetails = action.payload.order;
        }
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderDetails, clearPaymentUrl } = orderSlice.actions;
export default orderSlice.reducer;
