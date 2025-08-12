import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';
import ThemeToggle from "../Common/ThemeToggle";

const Topbar = () => {
  return (
    <div className="bg-matte-black  text-white py-3 px-4 relative">
      <div className="container mx-auto relative flex justify-center items-center">
        
        {/* Left: Icons (only on sm and up) */}
        <div className="absolute left-0 flex gap-4 hidden sm:flex">
          <a href="#" className="hover:text-red-600">
            <TbBrandMeta className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/abdul_rafi143/" className="hover:text-pink-500">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-blue-400">
            <FaXTwitter className="w-5 h-5" />
          </a>
        </div>

        {/* Center: Tagline (always visible & centered) */}
        <div className="text-sm text-center">
   Wherever You Are, the Sparkle Finds You!
        </div>
    

        {/* Right: Contact (only on sm and up) */}
        <div className="absolute right-0 hidden sm:block text-sm">
          <a href="tel:+919959088937" className="hover:text-red-700">
            +91 9959088937
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default Topbar;
