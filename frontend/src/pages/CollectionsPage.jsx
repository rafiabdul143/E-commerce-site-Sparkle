import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import FilterSlidebar from '../components/product/FilterSlidebar';
import SortOptions from '../components/product/SortOptions';
import ProductGrid from '../components/product/ProductGrid';
import { fetchProductsApi } from '../services/api';

const COLLECTION_CONFIG = {
  all: { title: 'All Collections', description: 'Explore every new arrival and wardrobe essential.', filters: {} },
  men: { title: "Men's Collection", description: 'Everyday staples and elevated essentials for him.', filters: { gender: 'Men' } },
  women: { title: "Women's Collection", description: 'Modern pieces designed for every occasion.', filters: { gender: 'Women' } },
  children: { title: "Children's Collection", description: 'Comfortable, playful styles made for little ones.', filters: { gender: 'Children' } },
};

const CollectionsPage = () => {
  const { collections = 'all' } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const sidebarRef = useRef(null);
  const currentCollection = COLLECTION_CONFIG[collections.toLowerCase()] || COLLECTION_CONFIG.all;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const params = Object.fromEntries(searchParams.entries());
        const routeFilters = COLLECTION_CONFIG[collections.toLowerCase()]?.filters || {};
        const data = await fetchProductsApi({ ...routeFilters, ...params });
        if (data.success && data.products) {
          // Normalize _id for frontend compatibility
          const mapped = data.products.map(p => ({
            ...p,
            _id: p.id
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error('Failed to load products from database API:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [collections, searchParams]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Backdrop with blur effect */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 lg:px-8">
      <FilterSlidebar isOpen={isSidebarOpen} onClose={toggleSidebar} sidebarRef={sidebarRef} />
      <div className="min-w-0 flex-1">
        <div className="mb-6 border-b border-gray-200 pb-5">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-700">
              <ArrowLeft className="h-4 w-4" />
              <Home className="h-4 w-4" />
              Back to home
            </Link>
            <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-gray-500">Sparkle catalogue</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">{currentCollection.title}</h1>
            <p className="mt-2 text-gray-600">{currentCollection.description}</p>
          </div>
        </div>
        <SortOptions count={products.length} onOpenFilters={toggleSidebar} />
        {!loading && products.length === 0 ? <div className="rounded-xl border border-dashed border-gray-300 px-6 py-16 text-center"><h2 className="text-lg font-semibold">No products are available yet</h2><p className="mt-2 text-sm text-gray-600">Please check back soon or explore another collection.</p><Link to="/collections/all" className="mt-5 inline-block underline">View all products</Link></div> : <ProductGrid products={products} isLoading={loading} />}
      </div></div>
    </div>
  );
};

export default CollectionsPage;
