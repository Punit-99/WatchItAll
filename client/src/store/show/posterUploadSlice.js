import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/admin";

// Upload Poster to Cloudinary
export const uploadPoster = createAsyncThunk("poster/upload", async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${BASE_URL}/upload-file`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; // { url, public_id, resourceType }
});

// Delete Poster from Cloudinary
export const deletePoster = createAsyncThunk(
  "poster/delete",
  async ({ public_id, resourceType }) => {
    await axios.post(`${BASE_URL}/delete-file`, { public_id, file_type: resourceType });
    return public_id;
  }
);

const posterUploadSlice = createSlice({
  name: "posterUpload",
  initialState: {
    url: "",
    public_id: "",
    resourceType: "",
    loading: false,
    error: null,
  },
  reducers: {
    resetPoster: (state) => {
      state.url = "";
      state.public_id = "";
      state.resourceType = "";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPoster.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadPoster.fulfilled, (state, action) => {
        state.url = action.payload.url;
        state.public_id = action.payload.public_id;
        state.resourceType = action.payload.resourceType;
        state.loading = false;
      })
      .addCase(uploadPoster.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deletePoster.fulfilled, (state) => {
        state.url = "";
        state.public_id = "";
        state.resourceType = "";
        state.loading = false;
      });
  },
});

export const { resetPoster } = posterUploadSlice.actions;
export default posterUploadSlice.reducer;
