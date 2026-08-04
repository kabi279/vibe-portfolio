import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, Copy, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import './MemberCenter.css';

function MemberCenter() {
  const { tasks, claimTaskReward, summary, updateTaskProgress } = useTasks();
  const [points, setPoints] = useState(() => Number(localStorage.getItem('mall_points') || 3680));

  useEffect(() => {
    const syncPoints = () => setPoints(Number(localStorage.getItem('mall_points') || 3680));
    window.addEventListener('pointsUpdated', syncPoints);
    return () => window.removeEventListener('pointsUpdated', syncPoints);
  }, []);

  const claim = (taskId) => {
    const reward = claimTaskReward(taskId);
    if (!reward) return;
    const nextPoints = points + reward;
    setPoints(nextPoints);
    localStorage.setItem('mall_points', String(nextPoints));
    window.dispatchEvent(new Event('pointsUpdated'));
  };

  const share = async () => {
    const link = `${window.location.origin}${import.meta.env.BASE_URL}mall`;
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      window.prompt('复制链接分享给好友', link);
    }
    updateTaskProgress('share');
  };

  return (
    <main className="member-page">
      <header className="member-header"><Link to="/mall" aria-label="返回商城"><ArrowLeft size={19} /></Link><span>会员中心</span></header>
      <section className="member-hero"><span>JOURNEY CLUB</span><h1>Gold Member</h1><strong>{points.toLocaleString()} <small>pts</small></strong><p>享受专属权益与更多兑换惊喜</p></section>
      <section className="task-section">
        <div className="task-title"><div><span>MEMBER TASKS</span><h2>任务中心</h2></div><div className="task-summary"><Trophy size={14} /> 可领 {summary.availablePoints} 积分</div></div>
        <button className="share-button" onClick={share}><Copy size={16} /> 分享商城给好友 <span>+30</span></button>
        <div className="task-list">{tasks.map((task) => {
          const completed = task.status === 'completed';
          const claimed = task.status === 'claimed';
          return <article className={`task-item ${claimed ? 'claimed' : ''}`} key={task.id}>
            <div className="task-icon">{task.icon}</div>
            <div className="task-details"><div className="task-name">{task.name}{claimed && <em><Check size={11} /> 已领取</em>}</div><p>{task.desc}</p><div className="task-progress"><span style={{ width: `${(task.progress / task.target) * 100}%` }} /></div><small>{task.progress}/{task.target} · +{task.reward} 积分</small></div>
            {completed ? <button className="claim-button" onClick={() => claim(task.id)}>领取</button> : claimed ? <span className="claimed-copy">已完成</span> : <span className="task-state">{task.progress ? `${task.progress}/${task.target}` : '待完成'}</span>}
          </article>;
        })}</div>
      </section>
    </main>
  );
}

export default MemberCenter;
