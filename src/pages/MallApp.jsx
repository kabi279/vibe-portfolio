// src/pages/MallApp.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function MallApp() {
  return (
    <div style={{ 
      padding: '20px', 
      background: 'var(--mall-bg)', 
      minHeight: '100vh' 
    }}>
      {/* 顶部返回栏 */}
      <Link 
        to="/" 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          textDecoration: 'none', 
          color: 'var(--mall-primary)', 
          marginBottom: '24px',
          fontWeight: '500',
          padding: '8px 0'
        }}
      >
        <ArrowLeft size={20} /> 返回作品集
      </Link>

      {/* 主内容 */}
      <h1 style={{ color: 'var(--mall-primary)', fontSize: '24px', marginBottom: '8px' }}>
        🛍️ 会员权益商城
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
        Day 3 骨架已搭建 · 商品数据待填充 (Day 4)
      </p>

      {/* 占位卡片 */}
      <div style={{ 
        background: 'var(--white)', 
        padding: '60px 20px', 
        borderRadius: 'var(--radius-md)', 
        textAlign: 'center', 
        color: 'var(--gray-300)',
        border: '2px dashed var(--gray-200)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div>
        <p style={{ fontWeight: '500' }}>商品列表即将上线</p>
        <p style={{ fontSize: '14px', marginTop: '4px' }}>期待明天（Day 4）的权益展示</p>
      </div>
    </div>
  );
}

export default MallApp;