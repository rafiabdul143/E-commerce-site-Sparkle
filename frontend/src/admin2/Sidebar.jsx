import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // ✅ Needed for redirect
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  X,
 
  BarChart3,
  LogOut,
  Sparkles,
} from 'lucide-react';

const Sidebar = ({ onClose }) => {
  const { logout } = useAuth();  // ✅ Correct: inside component
  const navigate = useNavigate(); // ✅ Add this to redirect

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/'); // ✅ Redirect after logout
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] text-gray-300">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Sparkle</h1>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-red-700 text-white font-semibold'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleLogout}
          className="w-full h-8 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:bg-red-700 hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-gray-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-500">admin@company.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
