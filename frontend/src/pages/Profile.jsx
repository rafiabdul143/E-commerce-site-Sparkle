import React from 'react'
import MyordersPage from './MyordersPage'
import { NavLink, useNavigate } from 'react-router-dom'; // ✅ Needed for redirect
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { logout } = useAuth();  // ✅ Correct: inside component
    const navigate = useNavigate(); // ✅ Add this to redirect
     const handleLogout = () => {
    logout();
    navigate('/'); // ✅ Redirect after logout
  };
  return (
   <div className='min-h-screen flex flex-col'>
    <div className='flex-grow container mx-auto p-4 md:p-6'>
        <div className='flex flex-col md:flex-row md:space-x-6 space-y-6  md:space-y-0'>
           {/* Left section */}
<div className="w-full md:w-1/3 lg:w-1/4 shadow-lg rounded-xl border border-gray-300 bg-gradient-to-br from-white to-gray-50 p-6">
  <div className="flex flex-col items-start space-y-4">

    {/* Name & Verified */}
    <div className="relative inline-block">
      <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-emerald-500 inline-block pb-1 pr-2">
        Abdul Rafi
      </h1>
      <span className="ml-2 text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
        Verified
      </span>
    </div>

    {/* Email */}
    <p className="text-md text-gray-600">ksf@gmail.com</p>

    {/* Profile Summary Card */}
    <div className="w-full bg-white rounded-lg border border-gray-200 p-4 shadow-inner">
      <p className="text-sm text-gray-500 mb-2">👤 <span className="font-semibold">Member Since:</span> Jan 2023</p>
      <p className="text-sm text-gray-500 mb-2">📦 <span className="font-semibold">Total Orders:</span> 16</p>
      <p className="italic text-xs text-gray-400 mt-3">“Stay focused. Stay fashionable.”</p>
    </div>

    {/* Logout */}
    <button      onClick={handleLogout}  className="mt-4 w-full bg-gradient-to-r from-black to-gray-800 text-white px-6 py-2 rounded-full text-lg font-medium shadow hover:from-red-600 hover:to-red-800 hover:scale-105 transition-all duration-200">
      Log Out
    </button>
  </div>
</div>


            {/** Right section */}
            <div className=' w-full md:w-2/3 lg:w-3/4'>
            <MyordersPage/>
            </div>

        </div>

    </div>
   </div>
  )
}

export default Profile