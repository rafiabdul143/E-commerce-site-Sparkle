import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchProductByIdApi } from '../../services/api';
import { useCart } from '../../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  useEffect(() => { let active = true; setLoading(true); fetchProductByIdApi(id).then((result) => { if (active) setProduct(result.product); }).catch((requestError) => { if (active) setError(requestError.message || 'Unable to load this product.'); }).finally(() => active && setLoading(false)); return () => { active = false; }; }, [id]);
  const sizes = useMemo(() => [...new Set(product?.variants?.map((variant) => variant.size).filter(Boolean) || [])], [product]);
  const colors = useMemo(() => [...new Set(product?.variants?.map((variant) => variant.color).filter(Boolean) || [])], [product]);
  const selectedVariant = product?.variants?.find((variant) => (!size || variant.size === size) && (!color || variant.color === color));
  const stock = selectedVariant?.stockQuantity ?? product?.countInStock ?? 0;
  if (loading) return <main className="mx-auto max-w-6xl px-4 py-16 text-center text-gray-500">Loading product…</main>;
  if (error || !product) return <main className="mx-auto max-w-6xl px-4 py-16 text-center"><p role="alert" className="text-red-700">{error || 'Product not found.'}</p><Link className="mt-4 inline-block underline" to="/collections/all">Back to collections</Link></main>;
  const currentImage = product.images?.[selectedImage]?.url || '/placeholder.jpg';
  const addToCart = () => { if ((sizes.length && !size) || (colors.length && !color)) return toast.error('Please select the available size and colour.'); if (!stock) return toast.error('This item is currently out of stock.'); addItem(product, quantity, { size, color }); toast.success('Added to your cart.'); };
  return <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12"><div className="grid gap-8 md:grid-cols-2"><section><img className="aspect-[3/4] w-full rounded-xl object-cover" src={currentImage} alt={product.images?.[selectedImage]?.altText || product.name} />{product.images?.length > 1 && <div className="mt-3 flex gap-2 overflow-x-auto">{product.images.map((image, index) => <button type="button" aria-label={`View product image ${index + 1}`} onClick={() => setSelectedImage(index)} key={image.id || image.url} className={`shrink-0 rounded border-2 ${selectedImage === index ? 'border-gray-900' : 'border-transparent'}`}><img className="h-16 w-14 rounded object-cover" src={image.url} alt="" /></button>)}</div>}</section><section><p className="text-sm text-gray-500">{product.brand} · {product.category}</p><h1 className="mt-1 text-3xl font-semibold">{product.name}</h1><div className="mt-4 flex items-baseline gap-2"><span className="text-2xl font-bold">₹{(product.discountPrice ?? product.price).toFixed(2)}</span>{product.discountPrice && <del className="text-gray-500">₹{product.price.toFixed(2)}</del>}</div><p className="mt-5 leading-7 text-gray-700">{product.description}</p>{sizes.length > 0 && <fieldset className="mt-6"><legend className="mb-2 font-medium">Size</legend><div className="flex flex-wrap gap-2">{sizes.map((item) => <button type="button" key={item} onClick={() => setSize(item)} className={`min-h-11 rounded border px-4 ${size === item ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300'}`}>{item}</button>)}</div></fieldset>}{colors.length > 0 && <fieldset className="mt-6"><legend className="mb-2 font-medium">Colour</legend><div className="flex flex-wrap gap-2">{colors.map((item) => <button type="button" key={item} onClick={() => setColor(item)} className={`min-h-11 rounded border px-4 ${color === item ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300'}`}>{item}</button>)}</div></fieldset>}<div className="mt-6 flex items-center gap-3"><span className="font-medium">Quantity</span><button type="button" className="rounded border px-3 py-2" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>−</button><span>{quantity}</span><button type="button" className="rounded border px-3 py-2 disabled:opacity-40" disabled={quantity >= stock} onClick={() => setQuantity((current) => current + 1)}>+</button><span className="text-sm text-gray-500">{stock ? `${stock} available` : 'Out of stock'}</span></div><button type="button" disabled={!stock} onClick={addToCart} className="mt-7 min-h-12 w-full rounded bg-gray-900 font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-50">Add to cart</button></section></div></main>;
};

export default ProductDetails;
