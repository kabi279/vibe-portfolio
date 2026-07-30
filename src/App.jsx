// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import PortfolioHome from './pages/PortfolioHome';
import MallApp from './pages/MallApp';
import TravelApp from './pages/TravelApp';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/mall" element={<MallApp />} />
        <Route path="/travel" element={<TravelApp />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;