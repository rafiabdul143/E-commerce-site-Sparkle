import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import pic1 from '../../AR-assets/assets/Third_Pic.jpg';
import pic2 from '../../AR-assets/assets/Second_pic.jpg';
import pic3 from '../../AR-assets/assets/Main_pic.jpg';
import pic4 from '../../AR-assets/assets/6.jpg';
import pic5 from '../../AR-assets/assets/5.jpg';

const images = [pic1, pic2, pic3,pic4,pic5];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Auto Slide every 15s
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );

  const handleNext = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);

  const handleDotClick = (index) => setCurrentIndex(index);

  // TOUCH
  const handleTouchStart = (e) => setStartX(e.touches[0].clientX);

  const handleTouchEnd = (e) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    handleSwipe(endX);
  };

  // MOUSE
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || startX === null) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    if (Math.abs(diff) > 50) {
      handleSwipe(currentX);
    }
  };

  const handleMouseUpOrLeave = (e) => {
    if (!isDragging || startX === null) return;
    handleSwipe(e.clientX);
    setIsDragging(false);
    setStartX(null);
  };

  const handleSwipe = (endX) => {
    if (startX === null) return;
    const diff = endX - startX;
    const threshold = 50;
    if (diff > threshold) handlePrev();
    else if (diff < -threshold) handleNext();
    setStartX(null);
    setIsDragging(false);
  };

  return (
    <section className="relative group">
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`w-full h-[400px] md:h-[600px] lg:h-[750px] select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <img
          src={images[currentIndex]}
          alt="AR shopping"
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          draggable="false"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 flex flex-col items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-12 
               bg-gradient-to-r from-white/90 to-gray-300/90 bg-clip-text text-transparent 
               drop-shadow-[0_2px_4px_rgba(255,255,255,0.25)]">
            Vacation <br /> Ready ?
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-10">
            Explore Our Vacation-Ready Outfits with Fast Worldwide Shipping.
          </p>
          <Link
            to="#"
            className="bg-white text-gray-950 px-6 py-2 rounded-full border
             hover:border-red-700 hover:bg-black transition-shadow
              hover:text-white hover:border-2 text-lg"
          >
            Shop Now
          </Link>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'w-3 h-3 bg-white'
                  : 'w-2.5 h-2.5 bg-white/50'
              }`}
            ></button>
          ))}
        </div>

        {/* Arrows (Desktop Only) */}
        <button
          onClick={handlePrev}
          className="hidden sm:block absolute left-4 top-1/2 transform -translate-y-1/2 
            bg-black/50 hover:bg-black/70 text-white hover:border-2 hover:border-white text-3xl px-3 py-1 rounded-full 
            transition-opacity duration-300 opacity-0 sm:group-hover:opacity-100"
        >
          ‹
        </button>

        <button
          onClick={handleNext}
          className="hidden sm:block absolute right-4 top-1/2 transform -translate-y-1/2 
            bg-black/50 hover:bg-black/70 hover:border-2 hover:border-white text-white text-3xl px-3 py-1 rounded-full 
            transition-opacity duration-300 opacity-0 sm:group-hover:opacity-100"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default Hero;
