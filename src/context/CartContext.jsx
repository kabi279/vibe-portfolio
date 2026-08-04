import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem('mall_cart') || '[]');
    if (!Array.isArray(saved)) return [];
    return saved
      .filter((item) => item && item.id && Number(item.stock) > 0)
      .map((item) => ({ ...item, quantity: Math.max(1, Math.min(Number(item.quantity) || 1, Number(item.stock))) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(readCart);

  useEffect(() => {
    localStorage.setItem('mall_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product, quantity = 1) => {
    const stock = Number(product?.stock) || 0;
    if (!product?.id || stock <= 0) return false;
    const requested = Math.max(1, Number(quantity) || 1);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const nextQuantity = Math.min(existing.quantity + requested, stock);
        return prev.map((item) => item.id === product.id ? { ...item, ...product, quantity: nextQuantity } : item);
      }
      return [...prev, { ...product, quantity: Math.min(requested, stock) }];
    });
    return true;
  }, []);

  const removeFromCart = useCallback((productId) => setCartItems((prev) => prev.filter((item) => item.id !== productId)), []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    setCartItems((prev) => prev.flatMap((item) => {
      if (item.id !== productId) return [item];
      const stock = Number(item.stock) || 0;
      const quantity = Number(newQuantity);
      if (stock <= 0 || !Number.isFinite(quantity) || quantity <= 0) return [];
      return [{ ...item, quantity: Math.max(1, Math.min(Math.floor(quantity), stock)) }];
    }));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);
  const totals = useMemo(() => cartItems.reduce((result, item) => ({
    points: result.points + Number(item.points || 0) * item.quantity,
    items: result.items + item.quantity,
  }), { points: 0, items: 0 }), [cartItems]);
  const getTotalPoints = useCallback(() => totals.points, [totals.points]);
  const getTotalItems = useCallback(() => totals.items, [totals.items]);

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPoints,
    getTotalItems,
  }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPoints, getTotalItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
