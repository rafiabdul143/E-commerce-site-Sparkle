import React from 'react';
import { IoMdClose } from 'react-icons/io';
import Cartcontains from '../Cart/Cartcontains';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate("/Checkout");
  };

  return (
    <>
      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleCartDrawer}
        />
      )}

      {/* Cart Drawer */}
    <div
  className={`
    fixed right-0 bg-white shadow-xl flex flex-col z-50
    transform transition-transform duration-300 ease-in-out
    w-full max-w-sm sm:max-w-sm md:max-w-sm lg:max-w-sm
    h-[70%] lg:h-[90%]
    rounded-l-2xl
    ${drawerOpen ? "translate-x-0" : "translate-x-full"}
  `}
  style={{ top: "4rem" }}
>
      {/* Close Button & Offer Message */}
<div className="flex items-center justify-between p-4 border-b border-gray-200">
  {/* Offer Message */}
<span className="text-sm font-bold text-[#0f5132] bg-[#d1e7dd] px-3 py-1 rounded-md border border-[#badbcc]">
  🎉Enjoy flat 50% discount on Levis and Lee Cooper. Authentic styles, unbeatable prices.4
</span>

  {/* Close Button */}
  <button onClick={toggleCartDrawer} aria-label="Close cart drawer">
    <IoMdClose className="h-6 w-6 text-gray-600 hover:text-red-700" />
  </button>
</div>


        {/* Cart Contents */}
        <div className="flex-grow p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Cart</h2>
          <Cartcontains />
        </div>

        {/* Checkout Footer */}
        <div className="p-4 bg-white border-t border-gray-200">
          <button
            onClick={handleCheckout}
            className="w-full bg-gray-800 hover:bg-black text-white py-3 rounded-lg font-semibold 
              transition duration-300"
          >
            Checkout
          </button>
          <p className="text-sm text-gray-500 mt-2 text-center tracking-tight">
            Shipping, taxes, and discount code calculated at checkout.
          </p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
