import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NewArrivals = () => {


  const scrollRef = useRef(null);
  const [isDragging,setIsDragging]=useState(false);
  const[startX,setStartx]=useState(0);
  const[scrollLeft,setScrollLeft]=useState(false);
  const[canScrollLeft,setCanScrollLeft]=useState(false);
  const[canScrollRight,setCanScrollRight]=useState(true);

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
      }},
         {
      _id: "9",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=945",
        altText: "Leather Jacket"}
      },
         {
      _id: "10",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=94",
        altText: "Leather Jacket"}
      },
         {
      _id: "11",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=98",
        altText: "Leather Jacket"}
      },
         {
      _id: "12",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=62",
        altText: "Leather Jacket"
      }},
         {
      _id: "13",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=9621",
        altText: "Leather Jacket"}
      },
         {
      _id: "14",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=96",
        altText: "Leather Jacket"}
      },
         {
      _id: "15",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=984",
        altText: "Leather Jacket"}
      },
         {
      _id: "16",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=986",
        altText: "Leather Jacket"}
      },
         {
      _id: "17",
      name: "Leather Jacket",
      price: 2200,
      image: {
        url: "https://picsum.photos/536/354?random=169",
        altText: "Leather Jacket"
      }
    }
  
  ];
const handleMouseDown = (e) => {
  setIsDragging(true);
  setStartx(e.pageX - scrollRef.current.offsetLeft);
  setScrollLeft(scrollRef.current.scrollLeft);
};

const handleMouseMove = (e) => {
  if (!isDragging) return;
  const x = e.pageX - scrollRef.current.offsetLeft;
  const walk = x - startX;
  scrollRef.current.scrollLeft = scrollLeft - walk;
};

const handleMouseUpOrLeave = () => {
  setIsDragging(false);
};

  

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

      // Delay check until after scroll finishes
      setTimeout(() => {
        updateScrollButtons();
      }, 100); // 300ms delay matches typical scroll animation
    }
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(leftScroll < maxScrollLeft);

      console.log({
        scrollLeft: container.scrollLeft,
        clientWidth: container.clientWidth,
        scrollWidth: container.scrollWidth,
        canScrollLeft: leftScroll > 0,
        canScrollRight: leftScroll < maxScrollLeft

      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      updateScrollButtons(); // on mount
      container.addEventListener("scroll", updateScrollButtons);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  return (
    <section className="py-12 ">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to keep
          your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        {/* Scroll Buttons (hidden on mobile) */}
<div className="absolute right-4 top-0 mt-2 space-x-2 z-10 hidden sm:flex">
  <button
    onClick={() => scroll('left')}
    disabled={!canScrollLeft}
    className={`p-2 rounded-full border-1 hover:border-gray-400 border-2 hover:bg-gray-300 ${
      canScrollLeft
        ? "bg-white text-black"
        : "bg-gray-200 text-gray-400 cursor-not-allowed"
    }`}
  >
    <FiChevronLeft className="text-2xl" />
  </button>





          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border-1 hover:border-gray-400 border-2 hover:bg-gray-300 ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Product List */}
     <div
  ref={scrollRef}
  className={`container mx-auto overflow-x-scroll flex space-x-6 px-4 scrollbar-hide scroll-smooth relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}   // ✅ FIXED
  onMouseUp={handleMouseUpOrLeave}
  onMouseLeave={handleMouseUpOrLeave}
>

        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[25%] h-[300px] relative rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={product.image.url}
              alt={product.image.altText || product.name}
              className="w-full h-[500px] object-cover rounded-lg"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm text-white p-4">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium text-lg">{product.name}</h4>
                <p className="mt-1">₹{product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
