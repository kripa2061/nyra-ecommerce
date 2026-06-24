import React from "react";
import Navbar from "../../Component/Navbar/Navbar";
import Sidebar from "../../Component/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Dashboard from "../DashBoard/Dashboard";

const Layout = () => {
  return (
    <div className="admin-wrapper">
      <Navbar />
      <div className="admin-body">
        <Sidebar />
        <div className="admin-content">
          <Outlet />
       
        </div>
      </div>
    </div>
  );
};

export default Layout;