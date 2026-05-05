import React, { useState } from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FDFDFF]">
      <Sidebar role={role} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-12 gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter capitalize">
                {role} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Dashboard</span>
              </h1>
              <p className="text-gray-400 font-bold mt-1 md:mt-2 text-sm md:base">Welcome back, MD. Likhon Sorkar</p>
            </div>
            
            {/* Mobile Toggle Button */}
            <button 
              className="lg:hidden w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 shadow-sm"
              onClick={() => setSidebarOpen(true)}
            >
              <i className="fa-solid fa-bars-staggered text-xl"></i>
            </button>
          </div>

          <div className="flex items-center gap-4 md:gap-6 self-end md:self-auto">
            <button className="relative w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all shadow-sm">
              <i className="fa-solid fa-bell"></i>
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-600/20">
              L
            </div>
          </div>
        </header>

        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
