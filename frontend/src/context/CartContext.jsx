import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(undefined);
const STORAGE_KEY = 'sparkle_cart_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
  });
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [items]);
  const addItem = (product, quantity = 1, variant = {}) => {
    const id = `${product.id || product._id}:${variant.size || ''}:${variant.color || ''}`;
    setItems((current) => {
      const existing = current.find((item) => item.id === id);
      const stock = product.countInStock ?? Infinity;
      if (existing) return current.map((item) => item.id === id ? { ...item, quantity: Math.min(item.quantity + quantity, stock) } : item);
      return [...current, { id, productId: product.id || product._id, name: product.name, price: product.discountPrice ?? product.price, image: product.images?.[0]?.url, quantity: Math.min(quantity, stock), stock, ...variant }];
    });
  };
  const updateQuantity = (id, quantity) => setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) } : item));
  const removeItem = (id) => setItems((current) => current.filter((item) => item.id !== id));
  const clearCart = () => setItems([]);
  const value = useMemo(() => ({ items, addItem, updateQuantity, removeItem, clearCart, count: items.reduce((sum, item) => sum + item.quantity, 0), subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0) }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
