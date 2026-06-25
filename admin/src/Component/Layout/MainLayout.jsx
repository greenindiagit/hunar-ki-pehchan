import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
// import  side from "./sidebar-new"
const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // <div className="d-flex vh-100">
    <div >
      {/* Sidebar */}
      <Sidebar showSidebar={sidebarOpen} />
      {/* <side showSidebar={sidebarOpen} /> */}

      {/* Main Content */}
      {/* <div className="flex-grow-1 d-flex flex-column"> */}
      <div>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
