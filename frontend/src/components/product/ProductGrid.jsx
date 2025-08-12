import React from 'react';
import { Link } from 'react-router-dom';

const SkeletonCard = () => (
  <div className="bg-white p-4 rounded-lg shadow animate-pulse flex flex-col">
    <div className="aspect-[3/4] bg-gray-300 rounded-lg mb-3"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

const ProductGrid = ({ products = [], isLoading = false }) => {
  const skeletonCount = 8;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2  px-2 lg:ml-[5rem]">
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        : products.map((product, index) => (
            <Link
              key={product._id || index}
              to={`/product/${product._id}`}
              className="block h-full"
            >
              <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg hover:scale-[1.01] transition-all duration-200 h-full flex flex-col">
                <div className="aspect-[3/4] w-full mb-3">
                  <img
                    src={product?.images?.[0]?.url || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-semibold truncate min-h-[1.5rem]">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 font-medium text-sm sm:text-base tracking-tight mt-1">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default ProductGrid;
