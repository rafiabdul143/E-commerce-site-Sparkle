import { RiDeleteBin3Line } from 'react-icons/ri';
import { useCart } from '../../context/CartContext';

const Cartcontains = () => {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  if (!items.length) return <p className="py-10 text-center text-sm text-gray-500">Your cart is empty. Add something you love to get started.</p>;

  return <div className="p-1">
    {items.map((item) => <article key={item.id} className="flex gap-3 border-b py-4">
      <img src={item.image || '/placeholder.jpg'} alt={item.name} className="h-16 w-14 rounded object-cover" />
      <div className="min-w-0 flex-1"><h3 className="truncate font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-600">{[item.size, item.color].filter(Boolean).join(' · ')}</p>
        <div className="mt-2 flex items-center gap-3"><button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`} className="rounded border px-2">−</button><span>{item.quantity}</span><button type="button" disabled={item.quantity >= item.stock} onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`} className="rounded border px-2 disabled:opacity-40">+</button></div>
      </div>
      <div className="text-right"><p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p><button type="button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name} from cart`} className="mt-2 text-red-600"><RiDeleteBin3Line className="h-5 w-5" /></button></div>
    </article>)}
    <div className="flex justify-between pt-4 font-semibold"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
  </div>;
};

export default Cartcontains;
