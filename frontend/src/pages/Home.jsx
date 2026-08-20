import { ArrowRight, ShieldCheck, Truck, Undo2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createElement, useEffect, useState } from 'react';
import Hero from '../components/Layout/Hero';
import GenderCollection from '../components/product/GenderCollection';
import ProductGrid from '../components/product/ProductGrid';
import { fetchProductsApi } from '../services/api';

const assurances = [[Truck, 'Fast dispatch', 'Orders leave our warehouse quickly.'], [Undo2, 'Easy returns', 'Straightforward returns on eligible items.'], [ShieldCheck, 'Secure checkout', 'Your account and order details stay protected.']];
const Assurance = ({ icon, title, text }) => <div className="flex items-center gap-3"><div className="rounded-full bg-white p-2 text-indigo-700 shadow-sm">{createElement(icon, { className: 'h-5 w-5' })}</div><div><h2 className="text-sm font-semibold text-gray-900">{title}</h2><p className="text-xs text-gray-600">{text}</p></div></div>;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { let active = true; fetchProductsApi({ limit: 10, sortBy: 'newest' }).then((result) => { if (active) setProducts(result.products || []); }).catch(() => { if (active) setProducts([]); }).finally(() => active && setLoading(false)); return () => { active = false; }; }, []);
  return <main className="bg-white"><Hero /><section className="border-y border-gray-200 bg-slate-50"><div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:grid-cols-3 lg:px-8">{assurances.map(([icon, title, text]) => <Assurance key={title} icon={icon} title={title} text={text} />)}</div></section><section className="mx-auto max-w-7xl px-4 py-12 lg:px-8"><div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-700">Fresh picks</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-950">New arrivals</h1><p className="mt-2 text-gray-600">Thoughtfully selected styles, ready for your wardrobe.</p></div><Link to="/collections/all" className="hidden items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900 sm:inline-flex">View all <ArrowRight className="h-4 w-4" /></Link></div><ProductGrid products={products} isLoading={loading} /><Link to="/collections/all" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 sm:hidden">View all products <ArrowRight className="h-4 w-4" /></Link></section><section className="bg-slate-50 py-12"><div className="mx-auto max-w-7xl px-4 lg:px-8"><div className="mb-7"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-700">Shop your way</p><h2 className="mt-1 text-3xl font-bold tracking-tight">Find your next favourite</h2></div><GenderCollection /></div></section></main>;
};

export default Home;
