// src/pages/TravelApp.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function TravelApp() {
  return (
    <div style={{ 
      padding: '20px', 
      background: 'var(--travel-bg)', 
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
          color: 'var(--travel-primary)', 
          marginBottom: '24px',
          fontWeight: '500',
          padding: '8px 0'
        }}
      >
        <ArrowLeft size={20} /> 返回作品集
      </Link>

      {/* 主内容 */}
      <h1 style={{ color: 'var(--travel-primary)', fontSize: '24px', marginBottom: '8px' }}>
        ✈️ AI 旅游助手
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
        Day 3 骨架已搭建 · 城市数据待填充 (Day 8)
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
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🗺️</div>
        <p style={{ fontWeight: '500' }}>行程规划即将上线</p>
        <p style={{ fontSize: '14px', marginTop: '4px' }}>期待 Day 8 的目的地数据接入</p>
      </div>
    </div>
  );
}

export default TravelApp;