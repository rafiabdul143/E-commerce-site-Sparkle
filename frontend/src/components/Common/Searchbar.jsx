import React, { useState } from 'react';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search Term:', searchTerm);
    setIsOpen(false);
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out w-full 
      ${isOpen ? 'absolute top-0 left-0 h-16 z-50 bg-white/80 backdrop-blur-md shadow-md' : 'w-auto'}`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center h-full px-4 gap-2"
        >
          <div className="relative flex-1 max-w-xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products, brands, categories..."
              className="w-full px-4 py-2 pr-12 rounded-full bg-gray-100 text-sm placeholder:text-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              <HiMagnifyingGlass className="h-5 w-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSearchToggle}
            className="text-gray-500 hover:text-red-700"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button
          onClick={handleSearchToggle}
          className="text-black mt-1 hover:text-red-500 transition"
        >
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Searchbar;
