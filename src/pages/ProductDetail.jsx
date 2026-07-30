// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { mallData } from '../data/mallData';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = mallData.find(p => p.id === id);
    if (found) {
      setProduct(found);
    }
  }, [id]);

  if (!product) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>商品不存在</p>
        <Link to="/mall">返回商城</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`已加入购物车：${product.name} x${quantity}`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div style={{
      padding: '20px',
      paddingBottom: '100px',
      background: 'var(--mall-bg)',
      minHeight: '100vh'
    }}>
      {/* 顶部返回 */}
      <Link to="/mall" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-primary)', marginBottom: '16px' }}>
        <ArrowLeft size={24} /> 返回商城
      </Link>

      {/* 商品大图 */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '100%',
          maxHeight: '300px',
          objectFit: 'cover',
          borderRadius: 'var(--radius-md)',
          background: 'var(--gray-100)',
          marginBottom: '16px'
        }}
        onError={(e) => {
          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" font-size="40" fill="%23ccc"%3E📦%3C/text%3E%3C/svg%3E';
        }}
      />

      {/* 商品信息 */}
      <div style={{ background: 'white', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>{product.name}</h2>
        <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--mall-primary)', marginBottom: '8px' }}>
          {product.points} <span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--text-muted)' }}>积分</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '12px', background: 'var(--gray-100)', padding: '4px 12px', borderRadius: '12px' }}>
            {product.category}
          </span>
          <span style={{ fontSize: '12px', background: 'var(--gray-100)', padding: '4px 12px', borderRadius: '12px' }}>
            {product.level}
          </span>
          <span style={{ fontSize: '12px', background: 'var(--gray-100)', padding: '4px 12px', borderRadius: '12px' }}>
            库存 {product.stock}
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>{product.desc}</p>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'var(--gray-50)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
          <strong>使用规则：</strong>{product.rules}
        </div>
      </div>

      {/* 底部操作栏 */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        padding: '12px 20px',
        paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
        borderTop: '1px solid var(--gray-200)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid var(--gray-200)',
              background: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Minus size={16} />
          </button>
          <span style={{ fontSize: '18px', fontWeight: '600', minWidth: '32px', textAlign: 'center' }}>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={quantity >= product.stock}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid var(--gray-200)',
              background: quantity >= product.stock ? 'var(--gray-100)' : 'white',
              cursor: quantity >= product.stock ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: quantity >= product.stock ? 0.5 : 1
            }}
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            padding: '12px',
            background: 'var(--gray-100)',
            color: 'var(--text-primary)',
            border: '2px solid var(--gray-200)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minHeight: '44px'
          }}
        >
          <ShoppingCart size={20} /> 加入购物车
        </button>
        <button
          onClick={handleBuyNow}
          style={{
            flex: 1,
            padding: '12px',
            background: 'var(--mall-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            minHeight: '44px'
          }}
        >
          立即兑换
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;