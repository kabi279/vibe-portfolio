// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 直接从 localStorage 同步初始化
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('mall_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // 保存到 localStorage（每次 cartItems 变化时执行）
  useEffect(() => {
    localStorage.setItem('mall_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 添加商品到购物车
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        return [...prev, { ...product, quantity: Math.min(quantity, product.stock) }];
      }
    });
  };

  // 从购物车移除商品
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // 更新商品数量
  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const qty = Math.max(1, Math.min(newQuantity, item.stock));
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  // 清空购物车
  const clearCart = () => {
    setCartItems([]);
  };

  // 计算总积分
  const getTotalPoints = () => {
    return cartItems.reduce((total, item) => total + item.points * item.quantity, 0);
  };

  // 计算总商品数
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPoints,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};