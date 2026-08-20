import React, { useState } from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const initialWishlistItems = [
  {
    id: 'ox-sh-001',
    name: 'Classic Oxford Button-Down Shirt',
    price: 39.99,
    discountPrice: 34.99,
    category: 'Top Wear',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
  {
    id: 'slim-sh-002',
    name: 'Slim-Fit Stretch Denim Jacket',
    price: 89.99,
    discountPrice: 69.99,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
  {
    id: 'leather-blzr-003',
    name: 'Tailored Italian Leather Blazer',
    price: 189.99,
    discountPrice: 159.99,
    category: 'Blazers',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
];

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState(initialWishlistItems);

  const removeItem = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <Heart className="h-7 w-7 text-rose-500 fill-rose-500" />
            My Wishlist
          </h1>
          <p className="text-sm text-gray-500 mt-1">Saved items you love. Move them to your cart anytime.</p>
        </div>
        <span className="text-sm font-semibold bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full border border-rose-100">
          {wishlist.length} Saved Items
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800">Your wishlist is empty</h3>
          <p className="text-sm text-gray-500 mt-1 mb-6">Explore our catalog and click the heart icon on products you love.</p>
          <Link
            to="/collections/all"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            Explore Collections <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full text-gray-500 hover:text-rose-600 hover:bg-white transition shadow-sm"
                  title="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="p-5 space-y-3">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
                <h3 className="font-bold text-gray-900 text-base line-clamp-1">{item.name}</h3>

                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-extrabold text-gray-900">${item.discountPrice || item.price}</span>
                  {item.discountPrice && (
                    <span className="text-sm text-gray-400 line-through">${item.price}</span>
                  )}
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Link
                    to={`/product/${item.id}`}
                    className="flex-1 bg-gray-900 text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-indigo-600 transition shadow-sm"
                  >
                    <ShoppingBag className="h-4 w-4" /> Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
