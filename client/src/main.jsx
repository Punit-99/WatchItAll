import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store.js";
import ThemeWrapper from "./utils/ThemeWrapper.jsx";
import SnackbarAlert from "./component/ui/SnackbarAlert.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeWrapper>
        <App />
        <SnackbarAlert />
      </ThemeWrapper>
    </Provider>
  </BrowserRouter>
);
