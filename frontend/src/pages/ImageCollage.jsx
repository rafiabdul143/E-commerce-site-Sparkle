import React from 'react';
import MiniSlider from './MiniSlider';

import img1 from '../AR-assets/assets/L1.jpg';
import img2 from '../AR-assets/assets/L2.jpg';
import img3 from '../AR-assets/assets/wa2.jpg';
import img4 from '../AR-assets/assets/4.jpg';
import img5 from '../AR-assets/assets/L5.jpg';
import img6 from '../AR-assets/assets/L6.jpg';
import img7 from '../AR-assets/assets/L7.jpg';
import img8 from '../AR-assets/assets/testing4.jpg';
import img9 from '../AR-assets/assets/testing2.jpg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const ImageCollage = () => (
  <div className="relative w-full max-w-7xl mx-auto">
    {/* Soft overall blur overlay */}
    <div className="absolute inset-0 backdrop-blur-[1px] bg-blue-900/5 z-10 pointer-events-none" />

    {/* Decorative blobs */}
    <div className="absolute top-10 left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl z-10" />
    <div className="absolute bottom-10 right-16 w-20 h-20 bg-blue-300/15 rounded-full blur-xl z-10" />

    {/* Responsive square grid */}
    <div className="grid grid-cols-3 grid-rows-3 gap-4 p-4 relative z-20 aspect-[3/3]">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 aspect-square"
        >
          <MiniSlider images={[img, images[(idx + 1) % images.length]]} />
          
          {/* Optional extra blur on last row */}
        
        </div>
      ))}
    </div>

    {/* Decorative bottom line */}
    <div className="w-[80%] mx-auto border-t border-blue-400/30 mt-4" />
  </div>
);

export default ImageCollage;
