import React, { useState } from "react";
import {
  FaSearch,
  FaVideo,
  FaBell,
  FaUserCircle,
  FaYoutube,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const { loginWithRedirect, logout } = useAuth0();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <nav className='bg-[#181818] shadow-md fixed top-0 left-0 right-0 z-10 border-b border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#181818]'>
        <div className='flex items-center justify-between h-16 bg-[#181818]'>
          {/* Left Section */}
          <div
            className='flex items-center cursor-pointer bg-[#181818]'
            onClick={navigateToHome}
          >
            <div className='flex items-center text-white space-x-2 bg-[#181818]'>
              <FaYoutube className='text-red-500 text-2xl' />
              <span className='text-xl font-semibold'>AIAvatar</span>
            </div>
            <div className='hidden md:flex ml-6 items-center bg-[#181818]'>
              <input
                type='text'
                placeholder='Search'
                className='w-80 px-4 py-2 border border-gray-700 rounded-full bg-[#181818] text-white focus:outline-none focus:ring-2 focus:ring-white'
              />
              <button className='ml-2 bg-[#181818] p-2 rounded-full hover:bg-gray-700'>
                <FaSearch className='text-white' />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className='hidden md:flex items-center space-x-4 bg-[#181818]'>
            {!isLoggedIn ? (
              <button
                className='px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600'
                onClick={loginWithRedirect}
              >
                Sign In
              </button>
            ) : (
              <>
                <button
                  className='bg-[#181818] p-2 rounded-full hover:bg-gray-700'
                  onClick={() => navigate("/dashboard")}
                >
                  <FaVideo className='text-white' />
                </button>
                <button className='bg-[#181818] p-2 rounded-full hover:bg-gray-700'>
                  <FaBell className='text-white' />
                </button>

                {/* Profile Picture / Icon */}
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt='Profile'
                    className='w-8 h-8 rounded-full'
                  />
                ) : (
                  <FaUserCircle className='text-white text-2xl bg-[#181818] p-1 rounded-full' />
                )}

                <button
                  className='text-white bg-red-500 p-2 rounded-md hover:bg-red-600'
                  onClick={() => {
                    localStorage.removeItem("token");
                    logout({ returnTo: window.location.origin });
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='-mr-2 flex md:hidden bg-[#181818]'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
            >
              <svg
                className='h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-[#181818]'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#181818]'>
            <input
              type='text'
              placeholder='Search'
              className='w-full px-4 py-2 border border-gray-700 rounded-full bg-[#181818] text-white focus:outline-none focus:ring-2 focus:ring-white'
            />
            {!isLoggedIn ? (
              <button className='block w-full px-4 py-2 text-center text-white bg-gray-700 rounded-md hover:bg-gray-600'>
                Sign In
              </button>
            ) : (
              <>
                <button className='block w-full px-4 py-2 bg-[#181818] text-white rounded-md hover:bg-gray-700'>
                  Create Video
                </button>
                <button className='block w-full px-4 py-2 bg-[#181818] text-white rounded-md hover:bg-gray-700'>
                  Notifications
                </button>
                <button className='block w-full px-4 py-2 bg-[#181818] text-white rounded-md hover:bg-gray-700'>
                  Profile
                </button>
                <button
                  className='block w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
                  onClick={() => {
                    localStorage.removeItem("token");
                    logout({ returnTo: window.location.origin });
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
