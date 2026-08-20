import React from 'react';
import MyordersPage from './MyordersPage';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { Package, Heart, MapPin, LogOut, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <div className="flex-grow container mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Profile Card */}
          <div className="w-full lg:w-1/3 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              {/* User Identity Header */}
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 flex items-center gap-1.5">
                    {user?.name || 'Sparkle Member'}
                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">{user?.email || 'user@example.com'}</p>
                  <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-100">
                    {user?.role || 'Verified Member'}
                  </span>
                </div>
              </div>

              {/* Account Quick Navigation Menu */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <Link
                  to="/my-orders"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium text-xs transition border border-transparent hover:border-gray-200"
                >
                  <span className="flex items-center gap-2.5">
                    <Package className="h-4 w-4 text-indigo-600" /> My Orders History
                  </span>
                  <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full font-bold text-gray-600">View</span>
                </Link>

                <Link
                  to="/wishlist"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-rose-50/50 text-gray-700 font-medium text-xs transition border border-transparent hover:border-rose-100"
                >
                  <span className="flex items-center gap-2.5">
                    <Heart className="h-4 w-4 text-rose-500 fill-rose-500" /> Saved Wishlist
                  </span>
                  <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">Saved</span>
                </Link>

                <Link
                  to="/addresses"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50/50 text-gray-700 font-medium text-xs transition border border-transparent hover:border-emerald-100"
                >
                  <span className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 text-emerald-600" /> Shipping Addresses
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Manage</span>
                </Link>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-8 w-full bg-gray-900 text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-rose-600 transition shadow-sm"
            >
              <LogOut className="h-4 w-4" /> Log Out
            </button>
          </div>

          {/* Right Orders Section */}
          <div className="w-full lg:w-2/3">
            <MyordersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;