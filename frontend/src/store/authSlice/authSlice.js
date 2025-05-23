import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// export const checkAuth = createAsyncThunk(
//   "/auth/checkauth",
//   async () => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
//       {
//         withCredentials: true,
//         headers: {
//           "Cache-Control":
//             "no-store, no-cache, must-revalidate, proxy-revalidate",
//         },
//       }
//     );
//     return response.data;
//   }
// );

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async (token) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
      {
        
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    resetState: (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      },
  },
  extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending, (state)=>{
        state.isLoading = true;
    }).addCase(registerUser.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = action.payload;
    } ).addCase(registerUser.rejected,(state,action)=>{
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
    }).addCase(loginUser.pending, (state)=>{
      state.isLoading = true;
  }).addCase(loginUser.fulfilled,(state,action)=>{
      state.isLoading = false;
      state.isAuthenticated = action.payload.success ? true : false;
      state.user = action.payload.success ? action.payload.user : null;
      state.token= action.payload.token;
      sessionStorage.setItem('token',JSON.stringify(action.payload.token));
      console.log('Token stored in sessionStorage:', action.payload.token);
      // Store token in localStorage if login is successful
      if (action.payload.success && action.payload.token) {
        localStorage.setItem('token', action.payload.token);
        console.log('Token stored in localStorage');
      }
  } ).addCase(loginUser.rejected,(state,action)=>{
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
  }).addCase(checkAuth.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(checkAuth.fulfilled, (state, action) => {
    state.isLoading = false;
    state.user = action.payload.success ? action.payload.user : null;
    state.isAuthenticated = action.payload.success;
  })
  .addCase(checkAuth.rejected, (state, action) => {
    state.isLoading = false;
    state.user = null;
    state.isAuthenticated = false;
  }).addCase(logoutUser.pending, (state)=>{
    state.isLoading = true;
  }).addCase(logoutUser.fulfilled,(state,action)=>{
    state.isLoading = false;
    state.isAuthenticated = false;
    state.user = null;
    
    // Remove token from localStorage on logout
    localStorage.removeItem('token');
    console.log('Token removed from localStorage');
  })
  }
});

export const { setUser ,resetState} = authSlice.actions;
export default authSlice.reducer;
