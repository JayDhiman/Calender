import React, { useState, useEffect } from 'react';
import {
  Dashboard as DashboardIcon,
  CalendarMonth,
  EventNote,
  Settings,
  ExitToApp
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLogOutMutation } from "../../Service/Auth/authApiHelpers";

const Sidebar = ({ toggleSidebar }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();
  
  const [logout, { isLoading, isSuccess, isError, error }] = useLogOutMutation();

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  useEffect(() => {
    // Set active tab based on the route
    setActiveTab(location.pathname.split('/')[1] || 'dashboard');
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const menuItems = [
    { icon: <DashboardIcon />, name: 'Dashboard', key: 'dashboard', path: '/dashboard' },
    { icon: <CalendarMonth />, name: 'Calendar', key: 'calendar', path: '/calendar' },
    { icon: <EventNote />, name: 'Events', key: 'event', path: '/event' },
    { icon: <Settings />, name: 'Settings', key: 'settings', path: '/settings' },
    { icon: <Settings />, name: 'Tasks', key: 'tasks', path: '/tasks' },
  ];

  // Replace this with actual user data if available
  const profileImage = null;  // Replace with actual profile image URL
  const profileName = 'John Doe';  // Replace with actual user name

  return (
    <div className={` ${toggleSidebar ? 'w-44' : 'w-[40px]'} bg-gray-900 text-white h-screen flex flex-col`}>
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Smart Calendar</h1>
      </div>

      <nav className="flex-grow p-4">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.key}
            className={`
              flex items-center p-3 rounded-lg cursor-pointer mb-2
              ${activeTab === item.key
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700'
              }
            `}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        {/* Display user profile info */}
        <div className="flex items-center mb-4">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-4"
            />
          ) : (
            <div className="w-10 h-10 text-center p-1 text-xl font-semibold bg-white text-black rounded-full mr-3 ml-3">
              {profileName?.slice(0, 1)}
            </div>
          )}
          <div>
            <h3 className="font-semibold">{profileName}</h3>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center p-3 
            bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <ExitToApp className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
