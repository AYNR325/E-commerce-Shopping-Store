import  { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewAddress = createAsyncThunk(
  "address/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
      formData
    );
    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "address/fetchAllAddresses",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`
    );
    return response.data;
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`,

      formData
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressList: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedAddress = action.payload.data;
        state.addressList = state.addressList.map((address) =>
          address._id === updatedAddress._id ? updatedAddress : address
        );
      })
      .addCase(updateAddress.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export default addressSlice.reducer;