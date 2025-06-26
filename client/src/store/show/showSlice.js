import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "movie", // or 'webseries'
  title: "",
  description: "",
  poster: {
    url: "",
    public_id: "",
    resourceType: "",
  },
  releaseDate: "",
  genres: [],
  languages: [],
  uploads: [], // [{ subtitle, url, public_id, resourceType }]
  movieParts: [],
  webseriesSeasons: [],
};

const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    setShowDetails: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
    addUpload: (state, action) => {
      state.uploads.push(action.payload);
    },
    removeUpload: (state, action) => {
      const publicIdToRemove = action.payload;
      state.uploads = state.uploads.filter(
        (u) => u.public_id !== publicIdToRemove
      );
    },
    clearAllUploads: (state) => {
      state.uploads = [];
    },
    resetShowForm: () => initialState,
    setMovieParts: (state, action) => {
      state.movieParts = action.payload;
    },
    setWebseriesSeasons: (state, action) => {
      state.webseriesSeasons = action.payload;
    },
  },
});

export const {
  setShowDetails,
  setGenres,
  setLanguages,
  addUpload,
  removeUpload,
  clearAllUploads,
  resetShowForm,
  setMovieParts,
  setWebseriesSeasons,
} = showSlice.actions;

export default showSlice.reducer;
