import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTasks } from '../context/TaskContext';

function SuccessPage() {
  const { clearCart } = useCart();
  const { updateTaskProgress } = useTasks();
  useEffect(() => { updateTaskProgress('redeem'); clearCart(); }, [clearCart, updateTaskProgress]);
  return <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px', background: '#dedbd4', fontFamily: 'Inter, Segoe UI, PingFang SC, sans-serif' }}><section style={{ width: 'min(100%, 420px)', padding: '42px 26px', textAlign: 'center', borderRadius: '24px', background: '#fbfaf8', color: '#123956', boxShadow: '0 16px 32px rgba(35,45,50,.15)' }}><CheckCircle2 size={52} color="#4b9475" /><h1 style={{ margin: '16px 0 8px', fontSize: '24px' }}>兑换成功</h1><p style={{ margin: 0, color: '#7f9099', fontSize: '14px' }}>权益已加入你的会员账户</p><p style={{ margin: '16px 0 24px', color: '#c18b30', fontSize: '13px', fontWeight: 700 }}>首单兑换任务进度已更新</p><Link to="/member" style={{ display: 'block', padding: '12px', borderRadius: '11px', background: '#123956', color: '#fff', fontWeight: 700 }}>查看任务中心</Link></section></main>;
}

export default SuccessPage;
