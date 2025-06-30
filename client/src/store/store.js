import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import sidebarReducer from "./navbar/navbar";
import showReducer from "./show/showSlice";
import mediaUploadReducer from "./show/mediaUploadSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
    show: showReducer,
    mediaUpload: mediaUploadReducer,
  },
});

export default store;
