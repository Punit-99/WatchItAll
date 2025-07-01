import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import sidebarReducer from "./navbar/navbar";
import showReducer from "./show/showSlice";
import mediaUploadReducer from "./show/mediaUploadSlice";
import showApiReducer from "./showApi/showApiSlice";
import snackbarToastReducer from "./toast/snackbarSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
    show: showReducer,
    mediaUpload: mediaUploadReducer,
    showApi: showApiReducer,
    snackbarToast: snackbarToastReducer,
  },
});

export default store;
