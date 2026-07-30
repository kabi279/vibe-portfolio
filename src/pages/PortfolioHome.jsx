// src/pages/PortfolioHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin } from 'lucide-react';

function PortfolioHome() {
  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '420px', 
      margin: '0 auto', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      {/* 头部信息 */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
          吴奕霖
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>产品 · 运营 · Vibe Coding</p>
      </div>

      {/* 项目入口卡片 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* 商城入口 */}
        <Link 
          to="/mall" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px',
            padding: '20px', 
            background: 'var(--mall-bg)', 
            border: `2px solid var(--mall-primary)`, 
            borderRadius: 'var(--radius-md)', 
            textDecoration: 'none', 
            color: 'var(--mall-primary)',
            fontWeight: '600', 
            fontSize: '18px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#fde8e5'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--mall-bg)'}
        >
          <ShoppingBag size={24} />
          会员权益商城
          <span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--text-muted)' }}>→</span>
        </Link>

        {/* 旅游入口 */}
        <Link 
          to="/travel" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px',
            padding: '20px', 
            background: 'var(--travel-bg)', 
            border: `2px solid var(--travel-primary)`, 
            borderRadius: 'var(--radius-md)', 
            textDecoration: 'none', 
            color: 'var(--travel-primary)',
            fontWeight: '600', 
            fontSize: '18px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#e0f2f0'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--travel-bg)'}
        >
          <MapPin size={24} />
          AI 旅游助手
          <span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--text-muted)' }}>→</span>
        </Link>
      </div>

      {/* 底部脚注 */}
      <p style={{ 
        marginTop: '48px', 
        fontSize: '12px', 
        color: 'var(--gray-300)', 
        textAlign: 'center',
        letterSpacing: '1px'
      }}>
        14天 Vibe Coding 作品集 · 2026
      </p>
    </div>
  );
}

export default PortfolioHome;