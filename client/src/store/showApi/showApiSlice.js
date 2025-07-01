// src/store/showApi/showApiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/admin";

// Submit new show data to backend
export const submitShow = createAsyncThunk(
  "showApi/submitShow",
  async (showData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-show`, showData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to submit show"
      );
    }
  }
);

// Fetch all uploaded shows from backend
export const fetchAllShows = createAsyncThunk(
  "showApi/fetchAllShows",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/all-shows`);
      return res.data.shows;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch shows"
      );
    }
  }
);

const showApiSlice = createSlice({
  name: "showApi",
  initialState: {
    shows: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetSubmitState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Show
      .addCase(submitShow.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitShow.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitShow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Shows
      .addCase(fetchAllShows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllShows.fulfilled, (state, action) => {
        state.loading = false;
        state.shows = action.payload;
      })
      .addCase(fetchAllShows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSubmitState } = showApiSlice.actions;
export default showApiSlice.reducer;
