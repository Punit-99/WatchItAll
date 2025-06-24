import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://localhost:5000/api/v1/admin";

// Async thunk to handle file upload
export const uploadFile = createAsyncThunk("upload/file", async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log(file);
  console.log(formData);
  const response = await axios.post(`${BASE_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.url; // Assuming backend returns uploaded file URL
});

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    url: "",
    loading: false,
    error: null,
  },
  reducers: {
    resetUpload: (state) => {
      state.url = "";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.url = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetUpload } = uploadSlice.actions;
export default uploadSlice.reducer;
