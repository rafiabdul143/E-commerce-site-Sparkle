import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSlidebar from '../components/product/FilterSlidebar';
import SortOptions from '../components/product/SortOptions';
import ProductGrid from '../components/product/ProductGrid';




const CollectionsPage = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };
  const [loading, setLoading] = useState(true); // ← Add this

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
useEffect(() => {
  setTimeout(() => {
    const fetchedProducts = [
      { _id: 1, name: "product_1", price: 100, images: [{ url: "https://picsum.photos/536/354?random=2" }] },
      { _id: 2, name: "product_2", price: 100, images: [{ url: "https://picsum.photos/536/354?random=3" }] },
      { _id: 3, name: "product_3", price: 100, images: [{ url: "https://picsum.photos/536/354?random=4" }] },
      { _id: 4, name: "product_4", price: 100, images: [{ url: "https://picsum.photos/536/354?random=5" }] },
      { _id: 5, name: "product_5", price: 100, images: [{ url: "https://picsum.photos/536/354?random=6" }] },
      { _id: 6, name: "product_6", price: 100, images: [{ url: "https://picsum.photos/536/354?random=7" }] },
      { _id: 7, name: "product_7", price: 100, images: [{ url: "https://picsum.photos/536/354?random=8" }] },
      { _id: 8, name: "product_8", price: 100, images: [{ url: "https://picsum.photos/536/354?random=9" }] },
      { _id: 9, name: "product_9", price: 100, images: [{ url: "https://picsum.photos/536/354?random=10" }] },
      { _id: 10, name: "product_1", price: 100, images: [{ url: "https://picsum.photos/536/354?random=2" }] },
      { _id: 11, name: "product_2", price: 100, images: [{ url: "https://picsum.photos/536/354?random=3" }] },
      { _id: 12, name: "product_3", price: 100, images: [{ url: "https://picsum.photos/536/354?random=4" }] },
      { _id: 13, name: "product_4", price: 100, images: [{ url: "https://picsum.photos/536/354?random=5" }] },
      { _id: 14, name: "product_5", price: 100, images: [{ url: "https://picsum.photos/536/354?random=6" }] },
      { _id: 15, name: "product_6", price: 100, images: [{ url: "https://picsum.photos/536/354?random=7" }] },
      { _id: 16, name: "product_7", price: 100, images: [{ url: "https://picsum.photos/536/354?random=8" }] },
      { _id: 17, name: "product_8", price: 100, images: [{ url: "https://picsum.photos/536/354?random=9" }] },
      { _id: 18, name: "product_9", price: 100, images: [{ url: "https://picsum.photos/536/354?random=10" }] },
    ];
    setProducts(fetchedProducts);
    setLoading(false); // ← Set loading false when done
  }, 1000);
}, []);

  return (
<div className="flex flex-col lg:flex-row min-h-screen">


      {/* Mobile Filter Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex items-center gap-2 m-4 w-fit"
      >
        <FaFilter /> Filters
      </button>

     {/* Backdrop with blur effect */}
{isSidebarOpen && (
  <div
    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
    onClick={toggleSidebar}
  ></div>
)}

      {/* Sidebar */}
      <FilterSlidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        sidebarRef={sidebarRef}
      />

      {/* Main Content */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>
        <SortOptions />
      <ProductGrid products={products} isLoading={loading} />

      </div>
    </div>
  );
};

export default CollectionsPage;
