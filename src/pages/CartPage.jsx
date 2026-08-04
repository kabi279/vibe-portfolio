// src/pages/CartPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPoints, getTotalItems } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    // Day 6 会实现完整的结算流程，现在先跳转到结算页占位
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div style={{
        padding: '20px',
        background: 'var(--mall-bg)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ShoppingBag size={64} color="var(--gray-300)" />
        <h2 style={{ color: 'var(--text-muted)', marginTop: '16px' }}>购物车是空的</h2>
        <p style={{ color: 'var(--gray-300)', fontSize: '14px' }}>快去兑换一些权益吧</p>
        <Link to="/mall" style={{
          marginTop: '24px',
          padding: '12px 32px',
          background: 'var(--mall-primary)',
          color: 'white',
          borderRadius: 'var(--radius-sm)',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          去逛逛
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      padding: '20px',
      paddingBottom: '100px',
      background: 'var(--mall-bg)',
      minHeight: '100vh'
    }}>
      {/* 顶部导航 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <Link to="/mall" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </Link>
        <span style={{ fontSize: '18px', fontWeight: '600' }}>购物车 ({getTotalItems()} 件)</span>
      </div>

      {/* 商品列表 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {cartItems.map(item => (
          <div key={item.id} style={{
            display: 'flex',
            gap: '12px',
            background: 'white',
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <img
              src={item.image}
              alt={item.name}
              width="80"
              height="80"
              loading="lazy"
              decoding="async"
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--gray-100)'
              }}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" font-size="40" fill="%23ccc"%3E📦%3C/text%3E%3C/svg%3E';
              }}
            />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--mall-primary)' }}>
                  {item.points} 积分
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      width: '32px',
                      height: '32px',
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
                  <span style={{ fontSize: '16px', fontWeight: '600', minWidth: '24px', textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '1px solid var(--gray-200)',
                      background: item.quantity >= item.stock ? 'var(--gray-100)' : 'white',
                      cursor: item.quantity >= item.stock ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: item.quantity >= item.stock ? 0.5 : 1
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    color: 'var(--color-danger)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px'
                  }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部结算栏 */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        padding: '16px 20px',
        paddingBottom: 'calc(16px + env(safe-area-inset-bottom))',
        borderTop: '1px solid var(--gray-200)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>总计</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--mall-primary)' }}>
            {getTotalPoints()} <span style={{ fontSize: '14px', fontWeight: '400' }}>积分</span>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          style={{
            padding: '12px 32px',
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
          去结算
        </button>
      </div>
    </div>
  );
}

export default CartPage;