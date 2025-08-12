import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterSlidebar = ({ isOpen = false, onClose = () => {}, sidebarRef }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    color: '',
    sizes: [],
    price: 1000,
    material: [],  // ✅ Should be array
brand: [],     // ✅ Should be array

  });

  const categories = ['Top Wear', 'Bottom Wear'];
  const genders = ['Men', 'Women'];
  const colors = ['Red', 'Blue', 'Black', 'Cyan', 'Pink', 'Green', 'Orange', 'Purple', 'Gray', 'Violet', 'Yellow', 'Skyblue', 'Brown', 'Indigo', 'Silver'];
  const sizes = ["XS",'S', 'M', 'L', 'XL', 'XXL'];
 const material = [
  "Cotton",
  "Polyester",
  "Nylon",
  "Linen",
  "Silk",
  "Wool",
  "Rayon", // Also known as Viscose
  "Spandex" // Also known as Elastane or Lycra
];


  const brand=["levis","Flying Machine","Twills","Puma","Nike","Lee","Denim"]

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || '',
      gender: params.gender || '',
      color: params.color || '',
      sizes: params.sizes ? params.sizes.split(',') : [],
      price: params.price ? Number(params.price) : 1000,
material: params.material ? params.material.split(',') : [],
brand: params.brand ? params.brand.split(',') : [],

 
    });
  }, [searchParams]);

  const updateFilter = (key, value) => {
    const newFilters = { ...filters };
if (['sizes', 'material', 'brand'].includes(key)) {
  newFilters[key] = newFilters[key].includes(value)
    ? newFilters[key].filter(item => item !== value)
    : [...newFilters[key], value];
} else {
  newFilters[key] = value;
}

    setFilters(newFilters);

    const newParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        if (v.length > 0) newParams.set(k, v.join(','));
      } else if (v !== '') {
        newParams.set(k, v);
      }
    });

    setSearchParams(newParams);
  };

  return (
    <div
      ref={sidebarRef}
      className={`
        fixed top-0 left-0 z-50 w-[70%] sm:w-[60%] lg:w-96
        h-screen bg-white shadow-md p-4 overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:static lg:translate-x-0 lg:block
      `}
    >
      {/* Close Button on Mobile */}
      <div className="flex justify-end lg:hidden p-2">
        <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl">✕</button>
      </div>

      <h3 className="text-xl font-medium text-gray-800 mb-4">Filters</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={() => updateFilter('category', category)}
              className="mr-2 h-4 w-4 text-blue-500 border-gray-300"
            />
            <span className="text-gray-700 capitalize">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-2">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={() => updateFilter('gender', gender)}
              className="mr-2 h-4 w-4 text-blue-500 border-gray-300"
            />
            <span className="text-gray-700 capitalize">{gender}</span>
          </div>
        ))}
      </div>


       {/* material Filter */}
    <div className="mb-6">
  <label className="block text-gray-600 font-medium mb-2">Material</label>
  {material.map((item) => (
    <div key={item} className="flex items-center mb-2">
      <input
        type="checkbox"
        name="material"
        value={item}
        checked={filters.material.includes(item)}
        onChange={() => updateFilter('material', item)}
        className="mr-2 h-4 w-4 text-blue-500 border-gray-300"
      />
      <span className="text-gray-700 capitalize">{item}</span>
    </div>
  ))}
</div>



{/* Brand Filter */}
   <div className="mb-6">
  <label className="block text-gray-600 font-medium mb-2">Brand</label>
  {brand.map((item) => (
    <div key={item} className="flex items-center mb-2">
      <input
        type="checkbox"
        name="brand"
        value={item}
        checked={filters.brand.includes(item)}
        onChange={() => updateFilter('brand', item)}
        className="mr-2 h-4 w-4 text-blue-500 border-gray-300"
      />
      <span className="text-gray-700 capitalize">{item}</span>
    </div>
  ))}
</div>

      {/* Color Filter */}
      <div className="mb-6 mt-10 min-h-32">
        <label className="block text-gray-600 font-medium mb-2">Colors</label>
        <div className="overflow-x-auto pt-2 pb-2">
          <div className="inline-grid grid-rows-3 grid-flow-col gap-2 pr-2">
            {colors.map((clr) => (
              <button
                key={clr}
                onClick={() => updateFilter('color', clr)}
                className={`w-6 h-6 rounded-full border-2 transition hover:scale-110 ${
                  filters.color === clr
                    ? 'border-black ring-2 ring-offset-2 ring-black'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: clr.toLowerCase() }}
              ></button>
            ))}
          </div>
        </div>
      </div>

     {/* Size Filter */}
<div className="mb-6">
  <label className="block text-gray-600 font-medium mb-2">Sizes</label>
  <div className="grid grid-cols-3 gap-4">
    {sizes.map((size) => (
      <button
        key={size}
        onClick={() => updateFilter('sizes', size)}
        className={`flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium ${
          filters.sizes.includes(size)
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
        }`}
      >
        {size}
      </button>
    ))}
  </div>
</div>

      {/* Price Range Slider */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Max Price: ₹{filters.price}</label>
        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          value={filters.price}
          onChange={(e) => updateFilter('price', Number(e.target.value))}
          className="w-full accent-blue-500"
        />
      </div>
    </div>
  );
};

export default FilterSlidebar;
