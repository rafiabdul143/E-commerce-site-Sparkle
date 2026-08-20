import { X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const FilterSlidebar = ({ isOpen = false, onClose = () => {}, sidebarRef }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const setFilter = (key, value) => { const next = new URLSearchParams(searchParams); value ? next.set(key, value) : next.delete(key); setSearchParams(next); };
  const clear = () => { const sortBy = searchParams.get('sortBy'); setSearchParams(sortBy ? { sortBy } : {}); };
  const category = searchParams.get('category') || '';
  const gender = searchParams.get('gender') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const section = (title, content) => <section className="border-t border-gray-200 py-5"><h2 className="mb-3 text-sm font-semibold text-gray-900">{title}</h2>{content}</section>;
  return <aside ref={sidebarRef} className={`fixed inset-y-0 left-0 z-50 w-[min(22rem,88vw)] overflow-y-auto bg-white p-5 shadow-2xl transition-transform lg:static lg:z-auto lg:w-64 lg:translate-x-0 lg:rounded-xl lg:border lg:border-gray-200 lg:shadow-sm ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
    <div className="flex items-center justify-between"><h1 className="text-lg font-semibold">Filters</h1><div className="flex items-center gap-3"><button type="button" onClick={clear} className="text-sm font-medium text-indigo-700 hover:text-indigo-900">Clear</button><button type="button" onClick={onClose} className="rounded p-1 lg:hidden" aria-label="Close filters"><X className="h-5 w-5" /></button></div></div>
    {section('Category', <div className="space-y-2">{['Top Wear', 'Bottom Wear', 'Footwear', 'Accessories'].map((item) => <label key={item} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"><input type="radio" name="category" checked={category === item} onChange={() => setFilter('category', category === item ? '' : item)} />{item}</label>)}</div>)}
    {section('Shop for', <div className="space-y-2">{['Men', 'Women', 'Children'].map((item) => <label key={item} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"><input type="radio" name="gender" checked={gender === item} onChange={() => setFilter('gender', gender === item ? '' : item)} />{item}</label>)}</div>)}
    {section('Price', <label className="block text-sm text-gray-700">Up to <span className="font-semibold">₹{maxPrice || '10,000'}</span><input type="range" min="500" max="10000" step="500" value={maxPrice || 10000} onChange={(event) => setFilter('maxPrice', event.target.value === '10000' ? '' : event.target.value)} className="mt-3 w-full accent-indigo-700" /></label>)}
  </aside>;
};

export default FilterSlidebar;
