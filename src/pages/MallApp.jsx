// src/pages/MallApp.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Star, Zap, ShoppingCart } from 'lucide-react';
import { mallData } from '../data/mallData';
import { useCart } from '../context/CartContext';

function MallApp() {
  // ===== 状态管理 =====
  const [userLevel, setUserLevel] = useState('银卡');
  const [points, setPoints] = useState(3680);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [filteredProducts, setFilteredProducts] = useState(mallData);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ===== 签到功能 =====
  useEffect(() => {
    const savedCheckIn = localStorage.getItem('mall_checkin');
    if (savedCheckIn === 'true') {
      setIsCheckedIn(true);
    }
    const savedPoints = localStorage.getItem('mall_points');
    if (savedPoints) {
      setPoints(Number(savedPoints));
    }
  }, []);

  const handleCheckIn = () => {
    if (isCheckedIn) return;
    const newPoints = points + 50;
    setPoints(newPoints);
    setIsCheckedIn(true);
    localStorage.setItem('mall_checkin', 'true');
    localStorage.setItem('mall_points', String(newPoints));
    alert('签到成功！+50 积分 🎉');
  };

  // ===== 分类筛选 =====
  useEffect(() => {
    if (selectedCategory === '全部') {
      setFilteredProducts(mallData);
    } else {
      setFilteredProducts(mallData.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory]);

  const categories = ['全部', ...new Set(mallData.map(item => item.category))];

  const getLevelColor = (level) => {
    const map = {
      '银卡': '#94A3B8',
      '金卡': '#F59E0B',
      '铂金卡': '#E8635A'
    };
    return map[level] || '#94A3B8';
  };

  const getGrowthProgress = () => {
    const growth = points;
    if (growth < 3000) return { current: growth, max: 3000, label: '银卡 → 金卡' };
    if (growth < 8000) return { current: growth - 3000, max: 5000, label: '金卡 → 铂金卡' };
    return { current: 100, max: 100, label: '已满级 🎉' };
  };
  const progress = getGrowthProgress();

  return (
    <div style={{ 
      paddingBottom: '80px', 
      background: 'var(--mall-bg)', 
      minHeight: '100vh' 
    }}>
      {/* ===== 顶部导航 ===== */}
      <div style={{ 
        padding: '16px 20px', 
        background: 'var(--mall-primary)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <Link to="/" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </Link>
        <span style={{ fontSize: '18px', fontWeight: '600' }}>会员权益商城</span>
      </div>

      {/* ===== 会员信息卡片 ===== */}
      <div style={{ 
        margin: '16px 16px 12px', 
        padding: '20px', 
        background: 'white', 
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: '700' }}>{userLevel}</span>
              <span style={{ 
                fontSize: '12px', 
                color: 'white', 
                background: getLevelColor(userLevel),
                padding: '2px 10px',
                borderRadius: '12px'
              }}>
                {userLevel === '银卡' && '⭐ 新锐'}
                {userLevel === '金卡' && '🌟 精英'}
                {userLevel === '铂金卡' && '👑 尊享'}
              </span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '4px' }}>
              {points} <span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--text-muted)' }}>积分</span>
            </div>
          </div>
          <button 
            onClick={handleCheckIn}
            disabled={isCheckedIn}
            style={{
              padding: '10px 20px',
              background: isCheckedIn ? 'var(--gray-300)' : 'var(--mall-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isCheckedIn ? 'default' : 'pointer',
              minHeight: '44px'
            }}
          >
            {isCheckedIn ? '✅ 已签到' : '📅 签到 +50'}
          </button>
        </div>

        {/* 成长进度条 */}
        <div style={{ marginTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>{progress.label}</span>
            <span>{Math.round((progress.current / progress.max) * 100)}%</span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '6px', 
            background: 'var(--gray-100)', 
            borderRadius: '4px',
            marginTop: '4px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: `${Math.min((progress.current / progress.max) * 100, 100)}%`,
              height: '100%',
              background: 'var(--mall-primary)',
              borderRadius: '4px',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>
      </div>

      {/* ===== 分类筛选 ===== */}
      <div style={{ 
        padding: '0 16px', 
        display: 'flex', 
        gap: '8px', 
        overflowX: 'auto',
        marginBottom: '16px',
        scrollbarWidth: 'none'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 16px',
              background: selectedCategory === cat ? 'var(--mall-primary)' : 'white',
              color: selectedCategory === cat ? 'white' : 'var(--text-secondary)',
              border: selectedCategory === cat ? 'none' : '1px solid var(--gray-200)',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              minHeight: '36px'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ===== 商品列表 ===== */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '12px',
          marginBottom: '16px'
        }}>
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onClick={() => navigate(`/product/${product.id}`)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img 
                src={product.image} 
                alt={product.name}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: product.category === '数字权益' ? 'contain' : 'cover',
                  background: 'var(--gray-100)',
                  padding: product.category === '数字权益' ? '8px' : '0'
                }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" font-size="40" fill="%23ccc"%3E📦%3C/text%3E%3C/svg%3E';
                }}
              />
              <div style={{ padding: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {product.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--mall-primary)' }}>
                    {product.points}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>积分</span>
                  {product.tags.slice(0, 2).map(tag => (
                    <span key={tag} style={{ 
                      fontSize: '10px', 
                      background: 'var(--gray-100)', 
                      padding: '2px 8px', 
                      borderRadius: '10px',
                      color: 'var(--text-muted)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: 'var(--text-muted)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>{product.category}</span>
                  <span style={{ 
                    fontSize: '10px',
                    background: getLevelColor(product.level),
                    color: 'white',
                    padding: '1px 8px',
                    borderRadius: '10px'
                  }}>
                    {product.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredProducts.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            color: 'var(--text-muted)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
            <p>该分类下暂无权益商品</p>
          </div>
        )}
      </div>

      {/* ===== 底部导航（已改成跳转购物车） ===== */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0',
        paddingBottom: 'env(safe-area-inset-bottom)',
        borderTop: '1px solid var(--gray-200)',
        zIndex: 10
      }}>
        <div 
          onClick={() => navigate('/cart')}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            color: 'var(--mall-primary)',
            cursor: 'pointer',
            padding: '4px 12px'
          }}
        >
          <ShoppingCart size={24} />
          <span style={{ fontSize: '11px', marginTop: '2px' }}>购物车</span>
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '4px 12px'
        }}>
          <Star size={24} />
          <span style={{ fontSize: '11px', marginTop: '2px' }}>会员中心</span>
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '4px 12px'
        }}>
          <Zap size={24} />
          <span style={{ fontSize: '11px', marginTop: '2px' }}>任务</span>
        </div>
      </div>
    </div>
  );
}

export default MallApp;