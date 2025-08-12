import React from 'react';
import { Link } from 'react-router-dom';
import womensCollectionImage from "../../AR-assets/assets/woman.jpg";
import mensCollectionImage from "../../AR-assets/assets/gentleman_pic.jpg";
import kidsCollectionImage from "../../AR-assets/assets/kid.jpg";

const GenderCollection = () => {
  return (
    <section className='py-6 px-4 lg:px-0'>
      <div className='container mx-auto flex flex-col md:flex-row gap-4'>
        
        {/* Women's Collection */}
        <div className='relative flex-1'>
          <img 
            src={womensCollectionImage}
            alt="Women's Collection"
            className='w-full h-[500px] object-cover' 
          />
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-70 p-4 '>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
              Women's Collection
            </h2>
            <Link to="/collections/all?gender=women" className='text-gray-900 underline'>
              Shop now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className='relative flex-1'>
          <img 
            src={mensCollectionImage}
            alt="Men's Collection"
            className='w-full h-[500px] object-cover' 
          />
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-70 p-4 '>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
              Men's Collection
            </h2>
            <Link to="/collections/all?gender=men" className='text-gray-900 underline'>
              Shop now
            </Link>
          </div>
        </div>
         {/* Men's Collection */}
        <div className='relative flex-1'>
          <img 
            src={kidsCollectionImage}
            alt="kid's Collection"
            className='w-full h-[500px] object-cover' 
          />
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-70 p-4 '>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
              Kids's Collection
            </h2>
            <Link to="/collections/all?gender=men" className='text-gray-900 underline'>
              Shop now
            </Link>
          </div>
        </div>

     </div>
   
    </section>
  );
};

export default GenderCollection;
const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 1500,
      image: {
        url: "https://picsum.photos/536/354?random=1",
        altText: "Stylish Jacket"
      }
    },
    {
      _id: "2",
      name: "Elegant Coat",
      price: 1800,
      image: {
        url: "https://picsum.photos/536/354?random=2",
        altText: "Elegant Coat"
      }
    },
    {
      _id: "3",
      name: "Trendy Hoodie",
      price: 1200,
      image: {
        url: "https://picsum.photos/536/354?random=3",
        altText: "Trendy Hoodie"
      }
    },
    {
      _id: "4",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=4",
        altText: "Leather Jacket"
      }},
      {
      _id: "5",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=5",
        altText: "Leather Jacket"
      }},
      {
      _id: "6",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=6",
        altText: "Leather Jacket"
      }},
      {
      _id: "7",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=7",
        altText: "Leather Jacket"
      }},
      {
      _id: "8",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=8",
        altText: "Leather Jacket"
      }
    },
      {
      _id: "9",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=9",
        altText: "Leather Jacket"
      }
    }
  
  ];