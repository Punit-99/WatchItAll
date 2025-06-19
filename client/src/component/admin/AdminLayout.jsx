import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import NavBar from "./Navbar";

export const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main content area */}
      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <NavBar />

        {/* Content */}
        <div className="p-6 mt-16">{/* <Outlet /> */}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
