import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AdminLayout } from "./component/admin/AdminLayout";
import Auth from "./component/auth/authLayout/authLayout";
import ModeToggle from "./component/ui/themeToggle";
import { Button, Card } from "@mui/material";
import AdminHome from "./pages/admin/Home";
import Shows from "./pages/admin/Shows";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Routes>
        {/* Home page */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* Admin Page */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="shows" element={<Shows />} />
          <Route path="newshows" element={<Shows />} />
          {/* <Route element={}/> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
