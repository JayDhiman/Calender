import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden w-auto">
      {/* Sidebar (left) */}
      <div className="">
        <Sidebar />
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        <Navbar />
        {/* Main Content Area (right) */}
        <div className="flex-grow flex overflow-y-auto">
            <div className="flex-grow overflow-y-auto" >{children}</div>
          </div>
      </div>
    </div>
  );
};

export default Layout;
