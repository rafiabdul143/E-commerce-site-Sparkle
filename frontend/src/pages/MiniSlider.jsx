import React, { useState, useEffect } from 'react';

const MiniSlider = ({ images = [], interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) {
    return null; // or fallback UI
  }

  return (
    <div className="overflow-hidden rounded-lg shadow-lg transition duration-1000 transform hover:scale-105 aspect-square w-full">
      <img
        src={images[currentIndex]}
        alt="sliding"
        className="object-cover w-full h-full rounded-lg transition-opacity duration-1000"
      />
    </div>
  );
};

export default MiniSlider;
