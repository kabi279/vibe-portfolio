import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { TaskProvider } from './context/TaskContext';
import CartPage from './pages/CartPage';
import MallApp from './pages/MallApp';
import MemberCenter from './pages/MemberCenter';
import PortfolioHome from './pages/PortfolioHome';
import ProductDetail from './pages/ProductDetail';
import SuccessPage from './pages/SuccessPage';
import TravelApp from './pages/TravelApp';
import { preloadMallImages } from './utils/preloadImages';

function App() {
  useEffect(() => {
    preloadMallImages();
  }, []);
  return <CartProvider><TaskProvider><Routes>
    <Route path="/" element={<PortfolioHome />} />
    <Route path="/mall" element={<MallApp />} />
    <Route path="/member" element={<MemberCenter />} />
    <Route path="/travel" element={<TravelApp />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/checkout" element={<SuccessPage />} />
  </Routes></TaskProvider></CartProvider>;
}

export default App;