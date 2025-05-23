import React from "react";
import { FaBars, FaVideo, FaRobot, FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/slice/sideBarSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { MdCreateNewFolder } from "react-icons/md";

const UserSideBar = () => {
  const { isOpen } = useSelector((state) => state.sidebar);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = () => {
    dispatch(toggleSidebar());
  };

  // Navigate to respective pages
  const navigateToCreateVideoWithAI = () => {
    navigate("/dashboard/create-with-ai");
  };

  const navigateToCreateVideoWithoutAI = () => {
    navigate("/dashboard/upload-video");
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="fixed top-0 left-0 h-screen mt-16 border-r border-gray-800 bg-[#181818]">
      {/* Sidebar */}
      <div
        className={`h-screen bg-[#181818] text-white transform ${
          isOpen ? "w-64" : "w-16"
        } transition-all duration-300 flex flex-col items-start`}
      >
        {/* Menu Button */}
        <button
          onClick={handleClick}
          className="text-white p-4 hover:bg-gray-700 focus:outline-none"
        >
          <FaBars />
        </button>

        {/* User Information */}
        {isOpen && (
          <div className="mt-4 flex flex-col items-center px-4 bg-[#181818]">
            <img
              src={user?.picture || "https://via.placeholder.com/40"}
              alt="User Profile"
              className="w-16 h-16 rounded-full mb-2"
            />
            <span className="font-semibold text-lg">{user?.name}</span>
            <span className="text-sm text-gray-400">{user?.email}</span>
          </div>
        )}

        {/* Sidebar Content */}
        <nav className={`mt-6 ${isOpen ? "pl-4" : ""} bg-[#181818]`}>
          <ul className="space-y-2">
            {/* "Your Videos" Button */}
            <li
              className="flex items-center space-x-4 px-2 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={()=>{
                navigate("/");
              }}
            >
              <FaHome />
              {isOpen && <span>Home</span>}
            </li>
            <li
              className="flex items-center space-x-4 px-2 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={navigateToDashboard}
            >
              <FaVideo />
              {isOpen && <span>Your Videos</span>}
            </li>

            {/* "Create Video" Buttons */}
            <div className="mt-6 space-y-2 bg-[#181818]">
              <li
                onClick={navigateToCreateVideoWithoutAI}
                className="flex items-center space-x-4 px-2 py-2 hover:bg-gray-700 cursor-pointer bg-[#181818]"
              >
                <MdCreateNewFolder />
                {isOpen && <span>Create Video With Model</span>}
              </li>
              <li
                onClick={navigateToCreateVideoWithAI}
                className="flex items-center space-x-4 px-2 py-2 hover:bg-gray-700 cursor-pointer bg-[#181818]"
              >
                <FaRobot />
                {isOpen && <span>Create Video With Heygen</span>}
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UserSideBar;
