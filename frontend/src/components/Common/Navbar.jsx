import React from 'react';
import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import Searchbar from './Searchbar';
import CartDrawer from '../Layout/CartDrawer';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import CollectionsPage from '../../pages/CollectionsPage';
import { MdAdminPanelSettings } from "react-icons/md";
import { Sparkles } from 'lucide-react';




const Navbar = () => {
  const cartCount = "2"; 
 
    const [drawerOpen, setDrawerOpen] = useState(false);
    const[navDrawerOpen,setNavDrawerOpen]=useState(false);
    const toggleNavDrawer=()=>{
      setNavDrawerOpen(!navDrawerOpen);
    }
    const toggleCartDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };

  return (
    <>
    <nav className="container mx-auto flex items-center justify-between py-4 px-6 mr-auto bg-white shadow-md">
      
      {/* Logo */}
  <div className="flex items-center space-x-2">
  <Link to="/" className="flex items-center space-x-2">
    <Sparkles className="h-8 w-8 text-red-600" />
    <span className="text-3xl font-bold tracking-wide text-gray-800 hover:text-red-800 transition duration-300 hidden sm:inline">
      Sparkle
    </span>
  </Link>
</div>



      {/* Menu */}
      <div className="hidden md:flex space-x-6">
        <Link to="/collections/all" className="text-gray-800 hover:text-red-800 transition duration-300">Men</Link>
        <Link to="#" className="text-gray-800 hover:text-red-700 transition duration-300">Woman</Link>
        <Link to="#" className="text-gray-800 hover:text-red-700 transition duration-300">Top Wear</Link>
        <Link to="#" className="text-gray-800 hover:text-red-700 transition duration-300">Bottom Wear</Link>
        <Link to="#" className="text-gray-800 hover:text-red-700 transition duration-300">Kids Wear</Link>
      </div>

      {/* Right Icons */}
      <div className="flex items-center mr-2 space-x-4">
          <Link to="/admin-login" className="hover:text-black">
          <MdAdminPanelSettings className="h-6 w-6 text-gray-700 hover:text-red-700" />
        </Link>
        <Link to="/login" className="hover:text-black">
          <HiOutlineUser className="h-6 w-6 text-gray-700 hover:text-red-700" />
        </Link>
        <button onClick={toggleCartDrawer}className="relative hover:text-black">
          <HiOutlineShoppingBag className="h-6 w-7 text-gray-700 hover:text-red-700" />
          <span className="absolute -top-1 -right-2 bg-red-700 w-5 h-5 text-white text-[10px] rounded-full flex items-center justify-center">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        </button>
         {/*search*/}
         <div className='overflow-hidden'>
           <Searchbar/>
            
          
         </div>
   
        <button  onClick={toggleNavDrawer}className='md:hidden'>
          <HiBars3BottomRight className='h-6 w-6 text-gray-700'/>
        </button>

        
        
      </div>

    </nav>
    <CartDrawer drawerOpen={drawerOpen}toggleCartDrawer={toggleCartDrawer}/>
    {/*Mobile Navigation*/}
  <>
  {/* Backdrop Blur when Drawer is Open */}
  {navDrawerOpen && (
    <div
      className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
      onClick={toggleNavDrawer}
    ></div>
  )}

  {/* Drawer Panel */}
  <div
    className={`fixed top-0 left-0 w-[70%] h-full bg-white shadow-lg z-50
      transform transition-transform duration-300
      ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
  >
    {/* Close Button */}
    <div className='flex justify-end p-4'>
      <button onClick={toggleNavDrawer}>
        <IoMdClose className='h-6 w-6 text-gray-700' />
      </button>
    </div>

    {/* Menu Content */}
    <div className='p-4'>
      <h2 className='text-xl font-semibold mb-4'>Menu</h2>
      <nav className='space-y-4'>
        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Men</Link>
        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Women</Link>
        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Top Wear</Link>
        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Bottom Wear</Link>
        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Kids Wear</Link>
      </nav>
    </div>
  </div>
</>
  
  
  {/* Mobile navigation content goes here */}


</>
  ); 
};

export default Navbar;
