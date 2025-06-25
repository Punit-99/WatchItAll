import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/admin";

export const uploadFile = createAsyncThunk("upload/file", async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(`${BASE_URL}/upload-file`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data; // { url, public_id, resourceType }
});

export const deleteFile = createAsyncThunk(
  "upload/delete",
  async ({ public_id, file_type }) => {
    await axios.post(`${BASE_URL}/delete-file`, { public_id, file_type });
    return public_id;
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    url: "",
    public_id: "",
    resourceType: "",
    loading: false,
    error: null,
  },
  reducers: {
    resetUpload: (state) => {
      state.url = "";
      state.public_id = "";
      state.resourceType = "";
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
        state.url = action.payload.url;
        state.public_id = action.payload.public_id;
        state.resourceType = action.payload.resourceType;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFile.fulfilled, (state) => {
        state.url = "";
        state.public_id = "";
        state.resourceType = "";
        state.loading = false;
      });
  },
});

export const { resetUpload } = uploadSlice.actions;
export default uploadSlice.reducer;

// mimetype
// :
// "image/jpeg"
// video/mp4
