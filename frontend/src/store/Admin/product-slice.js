import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "products/addnewproduct",
  async (formdata) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formdata,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/products/get`
    );

    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ _id, title, description, category, brand, price, salePrice, totalStock, image }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${_id}`,
      {
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        image
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(_id);

    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (_id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${_id}`
    );

    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      state.productList = action.payload.data;
      
    })
    .addCase(fetchAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.productList = [];
    })
    .addCase(editProduct.fulfilled, (state, action) => {
      console.log("Updated Product:", action.payload);
      const updatedProduct = action.payload.data;
      // Updating the state by replacing the updated product in the list
      state.productList = state.productList.map(product =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
    })
    // Handling the result of deleteProduct
    .addCase(deleteProduct.fulfilled, (state, action) => {
      const deletedProductId = action.payload.id;
      // Removing the deleted product from the list
      state.productList = state.productList.filter(product => product._id !== deletedProductId);
    });
  },
});

export default AdminProductsSlice.reducer;