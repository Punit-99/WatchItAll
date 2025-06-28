import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  description: "",
  releaseDate: "",
  type: "movie", // or 'webseries'
  poster: {
    url: "",
    public_id: "",
    resourceType: "",
  },
  genres: [],
  languages: [],
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
