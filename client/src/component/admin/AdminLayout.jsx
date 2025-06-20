import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import NavBar from "./Navbar";
import BreadCrums from "./BreadCrums";
import { useState } from "react";
export const AdminLayout = () => {
  const [activePage, setActivePage] = useState("Home");
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar setActivePage={setActivePage} />

      {/* Main content area */}
      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <NavBar />

        {/* Content */}
        <div className=" flex-grow overflow-auto p-4 ">
          <BreadCrums activePage={activePage} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
