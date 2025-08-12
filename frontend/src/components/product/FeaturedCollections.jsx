import React from 'react'
import { Link } from 'react-router-dom';
import featured1 from  '../../AR-assets/assets/featured2.jpg';
const FeaturedCollections = () => {
  return (
    <section className='py-16 px-4 lg:px-8 mb-0 '>
    <div className='container mx-auto flex flex-col-reverse  mt-4 lg:flex-row items-center
     bg-green-200 rounded-3xl'>
    {/*Left Content */}
     <div className='lg:w-1/2 p-8 text-center lg:text-left'>
        <h2 className='text-lg font-semibold text-gray-700 mb-2'>
        Comfort And Style
        </h2>
        <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
            Apparel made for your everyday life
        </h2>

        <p className='text-lg text-gray-600 mb-6'>
            Discovery high-quality,comfortable clothing that effortlessly blends 
            fashion and function.Designed to make your look and feel great every day.
        </p>
        <Link to="/collections/alt" className="bg-black text-white px-6 py-2 rounded-full border hover:border-red-700 hover:bg-black transition-shadow hover:text-white hover:border-2 text-lg">
            Shop Now
        </Link>

     </div>
     {/*Right content  */}
 <div className='lg:w-1/2 '>

     <img src={featured1}alt="Featured Collection"
     className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-full lg:rounded-br-3xl'/>

     </div>
     </div>
     </section>
  )
}

export default FeaturedCollections;