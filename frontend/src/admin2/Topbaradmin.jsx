import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';

const Topbaradmin = ({ onMenuClick }) => {
  return (
    <header className="bg-[#0f0f0f] shadow-sm border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-4 lg:px-8">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-300" />
          </button>

          {/* Search Input */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-96 pl-10 pr-4 py-2 bg-[#1a1a1a] text-gray-200 placeholder-gray-500 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <Bell className="w-5 h-5 text-gray-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></span>
          </button>

          {/* User Info */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbaradmin;
