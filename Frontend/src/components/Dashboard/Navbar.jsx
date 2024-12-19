import React from 'react';
import { Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = ({handleToggleSidebar}) => {
  return (
    <div className="bg-blue-600 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold">Smart Calendar</Link>
      <button className="sm:hidden text-white">
        <Menu /> {/* Mobile menu icon */}
      </button>
      <div className="hidden sm:flex">
        <nav>
          <Link to="/profile" className="text-white ml-4">Profile</Link>
          <Link to="/settings" className="text-white ml-4">Settings</Link>
        </nav>
        <button onClick={handleToggleSidebar}>togle </button>
      </div>
    </div>
  );
};

export default Navbar;
