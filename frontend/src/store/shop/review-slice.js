import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addProductReview = createAsyncThunk(
  "/products/addProductReview",
  async (data) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/review/add`,
      data
    );

    return result?.data;
  }
);
export const getAllReviews = createAsyncThunk(
  "/products/getAllReviews",
  async ( productID ) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/review/${productID}`
    );

    return result?.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
    .addCase(getAllReviews.pending,(state)=>{
        state.isLoading=true;
    })
    .addCase(getAllReviews.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.reviews=action.payload.data;
    })
    .addCase(getAllReviews.rejected,(state,action)=>{
        state.isLoading=false;
        state.reviews=[];
    })
  },
});

export default reviewSlice.reducer;