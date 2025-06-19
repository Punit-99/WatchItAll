import "./App.css";
import { AdminLayout } from "./component/admin/AdminLayout";
import Auth from "./component/auth/authLayout/authLayout";
import ModeToggle from "./component/ui/themeToggle";
import { Button, Card } from "@mui/material";

function App() {
  return (
    <>
      {/* <Auth /> */}
      <AdminLayout />
    </>
  );
}

export default App;
