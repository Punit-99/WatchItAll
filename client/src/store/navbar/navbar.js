import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false, // or false depending on your default
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
  },
});

// Export actions
export const { toggleSidebar, openSidebar, closeSidebar } =
  sidebarSlice.actions;

// Export reducer
export default sidebarSlice.reducer;
