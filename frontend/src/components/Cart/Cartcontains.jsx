import React from 'react';
import { RiDeleteBin3Line } from 'react-icons/ri';

const Cartcontains = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 1500,
      image: "https://picsum.photos/536/354"
    },
    {
      productId: 2,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 1500,
      image: "https://picsum.photos/536/354"
    }
  ];

  return (
    <div className="p-4">
      {
        cartProducts.map((product) => (
          <div key={product.productId} className="flex items-start justify-start py-4 border-b">
            <img
              src={product.image}
              alt={product.name}
              className="w-14 h-14 object-cover mr-4 rounded"
            />

            <div>
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600">Size: {product.size} | Color: {product.color}</p>
              <div className='flex items-center mt-2'>
                <button className='border rounded px-2 py-1 text-xl font-medium'>-</button>
                <span className='mx-4'>{product.quantity}</span>
                <button className='border rounded px-2 py-1 text-xl font-medium'>+</button>
              </div>
            </div>

            <div className="ml-auto text-right">
              <p className='font-medium'>₹{product.price.toLocaleString()}</p>
              <button>
                <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Cartcontains;
