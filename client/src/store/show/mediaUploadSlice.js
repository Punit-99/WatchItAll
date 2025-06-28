import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/admin";

// Upload a media file (movie part or episode)
export const uploadMediaFile = createAsyncThunk(
  "media/upload",
  async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(`${BASE_URL}/upload-file`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data; // { url, public_id, resourceType }
  }
);

// Delete a media file
export const deleteMediaFile = createAsyncThunk(
  "media/delete",
  async ({ public_id, resourceType }) => {
    console.log("Delete Media Slice Called");
    await axios.post(`${BASE_URL}/delete-file`, {
      public_id,
      file_type: resourceType,
    });
    return public_id;
  }
);

const mediaUploadSlice = createSlice({
  name: "mediaUpload",
  initialState: {
    uploads: [], // Each: { subtitle, url, public_id, resourceType }
    loading: false,
    error: null,
  },

  reducers: {
    addMediaUpload: (state, action) => {
      state.uploads.push(action.payload);
      console.log(state.uploads);
      console.log("Media Added");
    },
    removeMediaUpload: (state, action) => {
      const publicId = action.payload;
      state.uploads = state.uploads.filter(
        (item) => item.public_id !== publicId
      );
    },
    clearAllMediaUploads: (state) => {
      state.uploads = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadMediaFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadMediaFile.fulfilled, (state, action) => {
        state.loading = false;
        state.uploads.push(action.payload); // Automatically track it
      })
      .addCase(uploadMediaFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMediaFile.fulfilled, (state, action) => {
        state.uploads = state.uploads.filter(
          (u) => u.public_id !== action.payload
        );
      });
  },
});

export const { addMediaUpload, removeMediaUpload, clearAllMediaUploads } =
  mediaUploadSlice.actions;

export default mediaUploadSlice.reducer;
