import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import MallPage from './pages/Mallpage'

function HomePage() {
  return (
    <div className="portfolio-container">
      <h1 className="title">吴奕霖 · 作品集</h1>
      
      <div className="card-grid">
        <Link to="/mall" className="project-card">
          <div className="card-icon">🛍️</div>
          <h2>会员权益商城</h2>
          <p>会员等级 · 积分任务 · 权益筛选 · 购物车 · 积分抵扣 · 模拟结算</p>
          <span className="card-tag">React + Vite</span>
        </Link>
        
        <Link to="/travel" className="project-card">
          <div className="card-icon">✈️</div>
          <h2>AI 旅游助手</h2>
          <p>目的地推荐 · 逐日行程 · 预算汇总 · 景点替换 · 保存与分享</p>
          <span className="card-tag">本地推荐引擎</span>
        </Link>
      </div>
      
      <footer className="footer">
        <p>📅 2026年7月 · 作品集 Demo</p>
      </footer>
    </div>
  )
}

function TravelPage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>✈️ AI 旅游助手</h1>
      <p>正在建设中...</p>
      <Link to="/" style={{ color: '#4a90d9', textDecoration: 'underline' }}>← 返回作品集</Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mall" element={<MallPage />} />
        <Route path="/travel" element={<TravelPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App