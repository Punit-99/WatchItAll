import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/auth";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const googleAuth = createAsyncThunk("auth/google", async () => {
  const response = await axios.get(`${BASE_URL}/google`);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(googleAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user; // depends on your API response structure
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        console.error("Google Auth Failed:", action.error.message);
      });
  },
});

export default authSlice.reducer;
