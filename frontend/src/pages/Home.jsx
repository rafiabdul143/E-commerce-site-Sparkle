import Hero from '../components/Layout/Hero';
import GenderCollection from '../components/product/GenderCollection';
import NewArrivals from '../components/product/NewArrivals';
import ProductDetails from '../components/product/ProductDetails';
import ProductGrid from '../components/product/ProductGrid';
import FeaturedCollections from '../components/product/FeaturedCollections';
import FeaturesSection from '../components/product/FeaturesSection';
import React, { useEffect, useState } from 'react';

const placeholderProducts = [
  { _id: 1, name: "product_1", price: 100, images: [{ url: "https://picsum.photos/536/354?random=2" }] },
  { _id: 2, name: "product_2", price: 100, images: [{ url: "https://picsum.photos/536/354?random=3" }] },
  { _id: 3, name: "product_3", price: 100, images: [{ url: "https://picsum.photos/536/354?random=4" }] },
  { _id: 4, name: "product_4", price: 100, images: [{ url: "https://picsum.photos/536/354?random=5" }] },
  { _id: 5, name: "product_5", price: 100, images: [{ url: "https://picsum.photos/536/354?random=6" }] },
  { _id: 6, name: "product_6", price: 100, images: [{ url: "https://picsum.photos/536/354?random=7" }] },
  { _id: 7, name: "product_7", price: 100, images: [{ url: "https://picsum.photos/536/354?random=8" }] },
  { _id: 8, name: "product_8", price: 100, images: [{ url: "https://picsum.photos/536/354?random=9" }] },
  { _id: 9, name: "product_9", price: 100, images: [{ url: "https://picsum.photos/536/354?random=10" }] }
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setProducts(placeholderProducts); // ✅ Corrected
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <main>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      {/* Best Sellers */}
      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>Best Sellers</h2>
        <ProductDetails />

        {/* Top Wears for Women */}
        <h2 className='text-3xl text-center font-bold mb-4'>Top Wears For Women</h2>
        <ProductGrid products={products} isLoading={loading} />
      </div>

      <FeaturedCollections />
      <FeaturesSection />
    </main>
  );
};

export default Home;
