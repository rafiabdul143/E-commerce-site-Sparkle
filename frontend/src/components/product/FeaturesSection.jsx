import React from 'react'
import { HiShoppingBag } from "react-icons/hi2";
import { FaHeadset, FaClock } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
   <section className='py-16 px-4 bg-white mt-0'>
    <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center'>
        {/*Features*/}
        <div className='flex flex-col items-center'>
            <div className='p-4 rounded-full mb-4  text-black hover:text-red-600 '>
                <HiShoppingBag className="text-xl "/>

            </div>
            <h4 className='tracking-tighter  text-black hover:text-red-600 mb-2'>
                FREE INTERNATIONAL SHIPPING
            </h4>
            <p className="text-gray-600 text-sm tracking-tighter">
                On All The Orders Over $100.00
            </p>

        </div>
             <div className='flex flex-col items-center'>
            <div className='p-4 rounded-full mb-4   text-black hover:text-red-600'>
                <FaHeadset className="text-xl "/>

            </div>
            <h4 className='tracking-tighter mb-2 text-black hover:text-red-600'>
            24/7 CUSTOMER SUPPORT
            </h4>
            <p className="text-gray-600 text-sm tracking-tighter">
             Excluding weekoffs
            </p>

        </div>
             <div className='flex flex-col items-center'>
            <div className='p-4 rounded-full mb-4  text-black hover:text-red-600'>
                <FaLock className="text-xl "/>

            </div>
            <h4 className='tracking-tighter mb-2  text-black hover:text-red-600'>
               SECURE PAYMENTS
            </h4>
            <p className="text-gray-600 text-sm tracking-tighter">
              Transaction Without Hesitation
            </p>

        </div>
             <div className='flex flex-col items-center'>
            <div className='p-4 rounded-full mb-4   text-black hover:text-red-600'>
                <FaStar className="text-xl "/>

            </div>
            <h4 className='tracking-tighter mb-2  text-black hover:text-red-600 '>
              TOP PRODUCTS
            </h4>
            <p className="text-gray-600 text-sm tracking-tighter">
             Trust the Legacy of Brands
            </p>

        </div>
            
    </div>
   </section>
  )
}

export default FeaturesSection