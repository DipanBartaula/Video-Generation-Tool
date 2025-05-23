import React from "react";
import { FaBars, FaHome, FaVideo, FaUserCircle } from "react-icons/fa";
import { FaRegRegistered } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/slice/sideBarSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { isOpen } = useSelector((state) => state.sidebar);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="fixed top-0 left-0 h-screen mt-16 border-r border-gray-800 bg-[#181818] text-white transition-all duration-300">
      {/* Sidebar */}
      <div className={`h-full flex flex-col ${isOpen ? "w-64" : "w-16"} transition-all duration-300 bg-[#181818]`}>
        {/* Menu Button */}
        <button
          onClick={handleClick}
          className="text-white p-4 hover:bg-gray-700 focus:outline-none bg-[#181818]"
        >
          <FaBars />
        </button>

        {/* Profile Section */}
        {user && (
          <div className="flex flex-col items-center mb-4 bg-[#181818]">
            {user.picture ? (
              <img
                src={user.picture}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <FaUserCircle className="text-white text-3xl p-1 rounded-full bg-[#181818]" />
            )}
            {isOpen && <p className="mt-2 text-sm text-white">{user.name}</p>}
          </div>
        )}

        {/* Sidebar Content */}
        <nav className="flex-1 bg-[#181818]">
          <ul className="space-y-2">
            <li
              className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-700 cursor-pointer bg-[#181818]"
              onClick={() => navigate("/")}
            >
              <FaHome className="text-xl" />
              {isOpen && <span>Home</span>}
            </li>

            {user && (
              <li
                className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-700 cursor-pointer bg-[#181818]"
                onClick={() => navigate("/dashboard")}
              >
                <FaVideo className="text-xl" />
                {isOpen && <span>Your Videos</span>}
              </li>
            )}

            {user && (
              <li
                className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-700 cursor-pointer bg-[#181818]"
                onClick={() => navigate("/register")}
              >
                <FaRegRegistered className="text-xl" />
                {isOpen && <span>Register</span>}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
