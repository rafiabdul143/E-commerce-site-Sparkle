import React from 'react';
import { Link } from 'react-router-dom';
import { TbBrandMeta } from 'react-icons/tb';
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { FiPhoneCall } from 'react-icons/fi';

const Footer = ({ openFeedback, openFaqs }) => {
  return (
    <footer className='border-t py-12 px-4 sm:px-6 lg:px-0 pb-20 bg-white'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* Newsletter */}
        <div> 
          <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
          <p className='text-gray-500 mb-4'>
            Be the first to hear about new products, exclusive events and online offers.
          </p>
          <p className="text-red-600 text-sm mb-2 font-semibold animate-pop3d drop-shadow-pop-red">
            Sign-up and get 25% off on your first order.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder='Enter your email'
              className='p-3 w-full text-sm border border-gray-500 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all'
              required
            />
            <button
              type="submit"
              className='bg-gray-800 ml-1 text-white border border-transparent px-6 py-3 rounded-r-md text-sm hover:border-red-600 hover:text-red-700 transition-all'
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
          <ul className='space-y-2 text-gray-600'>
            <li><Link to="#" className="hover:text-red-700 transition-colors">Men's Top Wear</Link></li>
            <li><Link to="#" className="hover:text-red-700 transition-colors">Women's Top Wear</Link></li>
            <li><Link to="#" className="hover:text-red-700 transition-colors">Men's Bottom Wear</Link></li>
            <li><Link to="#" className="hover:text-red-700 transition-colors">Women's Bottom Wear</Link></li>
            <li><Link to="#" className="hover:text-red-700 transition-colors">Kid's Wear</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
          <ul className='space-y-2 text-gray-600'>
            <li>
              <span
                onClick={openFeedback}
                className="underline cursor-pointer hover:text-red-700 transition-colors"
              >
                Feedback Form
              </span>
            </li>
            <li><Link to="#" className="hover:text-red-700 transition-colors">Contact Us</Link></li>
            <li><Link to="#" className="hover:text-red-700 transition-colors">About Us</Link></li>
            <li>
              <span
                onClick={openFaqs}
                className="underline cursor-pointer hover:text-red-700 transition-colors"
              >
                FAQs
              </span>
            </li>
            <li><Link to="#" className="hover:text-red-700 transition-colors">Features</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className='text-lg text-gray-800 mb-2'>Follow Us</h3>
          <div className='flex items-center space-x-4'>
            <a href="https://github.com/rafiabdul143" target="_blank" rel="noopener noreferrer" className="hover:text-purple-800">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/abdul_rafi143/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram className="w-5 h-5" />
            </a>
              <a href="https://www.linkedin.com/in/abdulrafi0870/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-900">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
              <FaXTwitter className="w-5 h-5" />
            </a>
          </div>
          <p className='text-gray-600 mt-2 mb-2'>Call Us</p>
          <p className='text-gray-500 hover:text-red-700'>
            <FiPhoneCall className='inline-block mr-2' />+91 99590XXXXX
          </p>
        </div>
      </div>

      {/* Footer bottom */}
     <div className='container mx-auto mt-6 mb-6 border-t border-gray-200 pt-6 px-4'>
  <p className='text-gray-500 text-center text-xs sm:text-sm tracking-tight'>
    &copy; 2025 <span className="font-medium">Sparkle</span>. All rights reserved.
  </p>
</div>

    </footer>
  );
};

export default Footer;
