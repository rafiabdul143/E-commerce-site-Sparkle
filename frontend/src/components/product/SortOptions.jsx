import { SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const SortOptions = ({ count = 0, onOpenFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'newest';
  const updateSort = (event) => {
    const next = new URLSearchParams(searchParams);
    next.set('sortBy', event.target.value);
    setSearchParams(next);
  };
  return <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
    <p className="text-sm text-gray-600"><span className="font-semibold text-gray-900">{count}</span> products</p>
    <div className="flex items-center gap-3"><button type="button" onClick={onOpenFilters} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium lg:hidden"><SlidersHorizontal className="h-4 w-4" /> Filters</button><label className="flex items-center gap-2 text-sm font-medium text-gray-700">Sort <select value={sortBy} onChange={updateSort} className="rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal focus:border-gray-900 focus:outline-none"><option value="newest">Newest arrivals</option><option value="rating">Highest rated</option><option value="priceAsc">Price: low to high</option><option value="priceDesc">Price: high to low</option></select></label></div>
  </div>;
};

export default SortOptions;
