import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AdminLayout } from "./component/admin/AdminLayout";
import Auth from "./component/auth/authLayout/authLayout";
import ModeToggle from "./component/ui/themeToggle";
import { Button, Card } from "@mui/material";
import AdminHome from "./pages/admin/Home";
import Shows from "./pages/admin/Shows";
import Home from "./pages/home/Home";
import NewShow from "./pages/admin/NewShow";
import Users from "./pages/admin/User";
import NotFound from "./pages/notFound/NotFound";

function App() {
  return (
    <>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />
        {/* Admin Page */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="shows" element={<Shows />} />
          <Route path="new-show" element={<NewShow />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
