import React, { useEffect, useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mallData } from '../data/mallData';
import { useCart } from '../context/CartContext';
import { useTasks } from '../context/TaskContext';
import ConfirmModal from '../components/ConfirmModal';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { updateTaskProgress } = useTasks();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const found = mallData.find((item) => item.id === id);
    setProduct(found || null);
    if (found) updateTaskProgress('browse', 1, id);
  }, [id, updateTaskProgress]);

  if (!product) return <div style={{ padding: '32px', textAlign: 'center' }}><p>商品不存在</p><Link to="/mall">返回商城</Link></div>;

  const handleAddToCart = () => {
    const added = addToCart(product, quantity);
    if (!added) { setFeedback('该权益已售罄'); return; }
    updateTaskProgress('add_cart', quantity);
    setFeedback('已加入购物车');
  };

  const handleBuyNow = () => {
    const added = addToCart(product, quantity);
    if (!added) { setFeedback('该权益已售罄'); return; }
    updateTaskProgress('add_cart', quantity);
    navigate('/cart');
  };

  return (
    <main style={{ padding: '20px 20px 100px', minHeight: '100vh', background: 'var(--mall-bg)' }}>
      <Link to="/mall" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--text-primary)' }}><ArrowLeft size={24} /> 返回商城</Link>
      <img src={product.image} alt={product.name} width="800" height="300" fetchPriority="high" decoding="async" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: 'var(--radius-md)', background: 'var(--gray-100)', marginBottom: '16px' }} />
      <section style={{ padding: '18px', marginBottom: '16px', borderRadius: 'var(--radius-md)', background: '#fff' }}>
        <h1 style={{ margin: '0 0 10px', fontSize: '22px' }}>{product.name}</h1>
        <div style={{ marginBottom: '8px', color: 'var(--mall-primary)', fontSize: '24px', fontWeight: 700 }}>{product.points} <span style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 400 }}>积分</span></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}><span>{product.category}</span><span>{product.level}</span><span>库存 {product.stock}</span></div>
        <p style={{ margin: '0 0 10px', color: 'var(--text-secondary)', fontSize: '14px' }}>{product.desc}</p><p style={{ margin: 0, padding: '12px', color: 'var(--text-muted)', borderRadius: 'var(--radius-sm)', background: 'var(--gray-100)', fontSize: '12px' }}><strong>使用规则：</strong>{product.rules}</p>
      </section>
      {feedback && <p role="status" style={{ color: 'var(--mall-primary)', fontWeight: 700 }}>{feedback}</p>}
      <footer style={{ position: 'fixed', right: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom))', borderTop: '1px solid var(--gray-200)', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><button aria-label="减少数量" onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '36px', height: '36px', border: '1px solid var(--gray-200)', borderRadius: '50%', background: '#fff' }}><Minus size={16} /></button><span style={{ minWidth: '26px', textAlign: 'center', fontWeight: 700 }}>{quantity}</span><button aria-label="增加数量" disabled={quantity >= product.stock} onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} style={{ width: '36px', height: '36px', border: '1px solid var(--gray-200)', borderRadius: '50%', background: quantity >= product.stock ? 'var(--gray-100)' : '#fff' }}><Plus size={16} /></button></div>
        <button onClick={handleAddToCart} disabled={product.stock <= 0} style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '44px', padding: '12px', border: '2px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', background: 'var(--gray-100)', color: 'var(--text-primary)', fontWeight: 700 }}><ShoppingCart size={20} /> 加入购物车</button>
        <button onClick={() => setShowConfirm(true)} disabled={product.stock <= 0} style={{ flex: 1, minHeight: '44px', padding: '12px', border: 0, borderRadius: 'var(--radius-sm)', background: 'var(--mall-primary)', color: '#fff', fontWeight: 700 }}>立即兑换</button>
      </footer>
      <ConfirmModal
        open={showConfirm}
        title="是否进行兑换"
        message={`本次将消耗 ${product.points * quantity} 积分，确认兑换「${product.name}」吗？`}
        confirmText="是"
        cancelText="否"
        onConfirm={() => { setShowConfirm(false); handleBuyNow(); }}
        onCancel={() => setShowConfirm(false)}
      />
    </main>
  );
}

export default ProductDetail;
