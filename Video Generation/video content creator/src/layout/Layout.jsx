import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Sidebar from "../components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import UserSideBar from "../components/use_sidebar/UserSideBar";

function Layout() {
  const { isOpen } = useSelector((state) => state.sidebar);

  const { pathname } = useLocation();

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      {pathname.includes("dashboard") ? <UserSideBar /> : <Sidebar />}

      {/* Set left margin based on isOpen and apply background color #1f1f1f */}
      <div
        className={`mt-16 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        } bg-[#1f1f1f] text-white `}  // Applied background color and text color
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
