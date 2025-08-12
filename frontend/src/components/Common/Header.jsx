import React from 'react';
import Topbar from '../Layout/topbar';
import Navbar from './Navbar';
import ThemeToggle from './ThemeToggle';
const Header = () => {
  return (
    <header className='border-b  border-gray-100'>
      
      <Topbar />
      <Navbar/>
       
      {/* navbar */}
      {/* cart drawer */}
    </header>
  );
};

export default Header;
