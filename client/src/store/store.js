import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import sidebarReducer from "./navbar/navbar";
const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
  },
});

export default store;
