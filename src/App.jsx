// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PortfolioHome from './pages/PortfolioHome';
import MallApp from './pages/MallApp';
import TravelApp from './pages/TravelApp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route path="/mall" element={<MallApp />} />
      <Route path="/travel" element={<TravelApp />} />
    </Routes>
  );
}

export default App;