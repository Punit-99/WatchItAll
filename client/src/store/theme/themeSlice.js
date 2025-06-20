import { createSlice } from "@reduxjs/toolkit";

// Load initial theme from localStorage (or default to light)
const savedTheme = localStorage.getItem("themeMode") || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: savedTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("themeMode", state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
