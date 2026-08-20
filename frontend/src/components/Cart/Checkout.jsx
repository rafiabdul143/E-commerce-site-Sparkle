import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrderApi } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const emptyAddress = { firstName: '', lastName: '', address: '', city: '', postalCode: '', country: '', phone: '' };

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState(emptyAddress);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const shipping = items.length ? 10 : 0;

  const submit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) return navigate('/login');
    if (!items.length) return setError('Your cart is empty.');
    setSubmitting(true); setError('');
    try {
      const result = await createOrderApi({ items: items.map(({ productId, quantity, size, color }) => ({ productId, quantity, size, color })), shippingAddress: address, paymentMethod: 'COD' });
      clearCart();
      navigate('/order-confirmation', { state: { order: result.order } });
    } catch (requestError) { setError(requestError.message || 'We could not place your order. Please try again.'); }
    finally { setSubmitting(false); }
  };

  if (!items.length) return <main className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="text-2xl font-semibold">Your cart is empty</h1><Link className="mt-6 inline-block rounded bg-gray-900 px-5 py-3 text-white" to="/collections/all">Continue shopping</Link></main>;

  return <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1.2fr_.8fr] lg:px-8">
    <form onSubmit={submit} className="rounded-xl border bg-white p-5 shadow-sm sm:p-8"><h1 className="mb-6 text-2xl font-semibold">Checkout</h1>
      {error && <p role="alert" className="mb-5 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-2 text-lg font-medium">Shipping address</legend>
        {Object.entries({ firstName: 'First name', lastName: 'Last name', address: 'Street address', city: 'City', postalCode: 'Postal code', country: 'Country', phone: 'Phone' }).map(([key, label]) => <label key={key} className={key === 'address' ? 'sm:col-span-2' : ''}><span className="mb-1 block text-sm font-medium">{label}</span><input required type={key === 'phone' || key === 'postalCode' ? 'tel' : 'text'} value={address[key]} onChange={(e) => setAddress((current) => ({ ...current, [key]: e.target.value }))} className="w-full rounded border border-gray-300 px-3 py-2.5 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100" /></label>)}
      </fieldset>
      <button disabled={submitting} className="mt-8 w-full rounded bg-gray-900 py-3 font-semibold text-white hover:bg-black disabled:opacity-50">{submitting ? 'Placing order…' : isAuthenticated ? 'Place order' : 'Sign in to place order'}</button>
      <p className="mt-3 text-xs text-gray-500">Orders are priced and stock-checked again by the server before creation.</p>
    </form>
    <aside className="h-fit rounded-xl border bg-gray-50 p-5 sm:p-8"><h2 className="text-xl font-semibold">Order summary</h2><div className="mt-5 divide-y">{items.map((item) => <div key={item.id} className="flex gap-3 py-4"><img src={item.image || '/placeholder.jpg'} alt="" className="h-14 w-12 rounded object-cover" /><div className="min-w-0 flex-1"><p className="truncate font-medium">{item.name}</p><p className="text-sm text-gray-600">Qty {item.quantity}</p></div><span>₹{(item.price * item.quantity).toFixed(2)}</span></div>)}</div><dl className="mt-4 space-y-2 border-t pt-4 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>₹{subtotal.toFixed(2)}</dd></div><div className="flex justify-between"><dt>Shipping</dt><dd>₹{shipping.toFixed(2)}</dd></div><div className="flex justify-between pt-2 text-base font-semibold"><dt>Total</dt><dd>₹{(subtotal + shipping).toFixed(2)}</dd></div></dl></aside>
  </main>;
};

export default Checkout;
