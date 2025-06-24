import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import sidebarReducer from "./navbar/navbar";
import uploadFileReducer from "./upload/fileUpload";
const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
    upload: uploadFileReducer,
  },
});

export default store;
