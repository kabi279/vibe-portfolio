import React, { useMemo, useState } from 'react';
import { ArrowLeft, Check, Clock3, Gift, ShoppingBag, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { mallData } from '../data/mallData';
import { useTasks } from '../context/TaskContext';
import './MallApp.css';

const ALL_CATEGORY = '全部';
const levelTone = { 银卡: 'silver', 金卡: 'gold', 铂金卡: 'platinum' };
const todayKey = () => new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

function MallApp() {
  const [userLevel] = useState('金卡');
  const [points, setPoints] = useState(() => Number(localStorage.getItem('mall_points') || 3680));
  const [isCheckedIn, setIsCheckedIn] = useState(() => localStorage.getItem('mall_checkin_date') === todayKey());
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const navigate = useNavigate();
  const { updateTaskProgress } = useTasks();
  const categories = useMemo(() => [ALL_CATEGORY, ...new Set(mallData.map((item) => item.category))], []);
  const products = selectedCategory === ALL_CATEGORY ? mallData : mallData.filter((item) => item.category === selectedCategory);

  const handleCheckIn = () => {
    if (isCheckedIn) return;
    const updatedPoints = points + 50;
    setPoints(updatedPoints);
    setIsCheckedIn(true);
    localStorage.setItem('mall_checkin_date', todayKey());
    localStorage.setItem('mall_points', String(updatedPoints));
    updateTaskProgress('checkin');
    window.dispatchEvent(new Event('pointsUpdated'));
  };

  const progress = Math.max(0, Math.min(Math.round(((points - 3000) / 5000) * 100), 100));

  return (
    <main className="mall-shell">
      <section className="mall-app" aria-label="会员权益商城">
        <header className="mall-header">
          <Link className="mall-back" to="/" aria-label="返回首页"><ArrowLeft size={18} /></Link>
          <div className="mall-brandmark">JC</div>
          <div className="mall-welcome"><span>WELCOME BACK</span><strong>Journey Club</strong></div>
          <button className="mall-status" onClick={() => navigate('/member')}>{userLevel} Member</button>
          <div className="mall-avatar">J</div>
        </header>
        <div className="mall-content">
          <section className="points-card">
            <div className="points-orb points-orb-one" /><div className="points-orb points-orb-two" />
            <div className="points-label">可用积分</div><div className="points-value">{points.toLocaleString()} <span>pts</span></div>
            <p className="points-subtitle">{userLevel} Member · 距离 Platinum 还差 {Math.max(0, 8000 - points).toLocaleString()} pts</p>
            <div className="points-expiry"><Clock3 size={15} /><span>1,200 积分将于 30 天后过期</span></div>
            <div className="points-progress-copy"><span>积分使用比例</span><span>{progress}%</span></div><div className="points-progress"><span style={{ width: `${progress}%` }} /></div>
          </section>
          <nav className="mall-tabs" aria-label="权益分类">{categories.map((category) => <button className={selectedCategory === category ? 'active' : ''} key={category} onClick={() => setSelectedCategory(category)}>{category === ALL_CATEGORY ? '推荐' : category}</button>)}</nav>
          <section className="product-grid" aria-live="polite">{products.map((product, index) => <article className="product-card" key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
            <div className="product-image-wrap"><img src={product.image} alt={product.name} width="320" height="180" loading="eager" fetchPriority={index < 2 ? 'high' : 'auto'} decoding="async" />{index === 0 && <span className="product-ribbon"><Sparkles size={11} /> 为你推荐</span>}{product.stock <= 50 && <span className="product-stock">仅剩 {product.stock} 件</span>}</div>
            <div className="product-body"><h2>{product.name}</h2><div className="product-points">{product.points.toLocaleString()} <span>积分</span></div><div className="product-meta"><span className="product-category">{product.category}</span><span className={`level-badge ${levelTone[product.level] ?? 'silver'}`}>{product.level}</span></div></div>
          </article>)}</section>
          {products.length === 0 && <div className="mall-empty"><Gift size={30} /><p>这个分类暂时没有可兑换权益</p></div>}
        </div>
        <footer className="mall-footer">
          <button className={isCheckedIn ? 'checked' : ''} onClick={handleCheckIn} disabled={isCheckedIn}>{isCheckedIn ? <Check size={16} /> : <Gift size={16} />}{isCheckedIn ? '今日已签到' : '签到 +50'}</button>
          <button className="member-button" onClick={() => navigate('/member')}><Gift size={17} /><span>任务中心</span></button>
          <button className="cart-button" onClick={() => navigate('/cart')}><ShoppingBag size={18} /><span>购物车</span></button>
        </footer>
      </section>
    </main>
  );
}

export default MallApp;
