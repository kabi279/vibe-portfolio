import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Baby,
  Bookmark,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  CloudRain,
  Footprints,
  Info,
  LoaderCircle,
  MapPin,
  RefreshCw,
  RotateCcw,
  Share2,
  Sparkles,
  StopCircle,
  Trash2,
  Users,
  WalletCards,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { companionOptions, interestOptions, travelCities, travelExamples } from '../data/travelData';
import {
  getReplacementOptions,
  generateTravelResponse,
  recalculateItinerary,
} from '../utils/generateItinerary';
import { track } from '../utils/track';
import './TravelApp.css';

const SAVED_KEY = 'travel_saved_plans';
const quickQuestions = [
  { id: 'rainy', label: '下雨天怎么排？', icon: CloudRain },
  { id: 'budget', label: '再省一点', icon: WalletCards },
  { id: 'family', label: '带孩子一起', icon: Baby },
  { id: 'walk', label: '少走一点路', icon: Footprints },
];

const defaultInput = travelExamples[0].input;

function readSavedPlans() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function formatRequest(input) {
  const interests = input.interests?.length ? input.interests.join('、') : '随心逛';
  return `${input.days} 天 · ${input.city || '未选择目的地'} · ${input.companion} · 预算 ¥${Number(input.budget || 0).toLocaleString()} · ${interests}`;
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString('zh-CN');
}

function TravelMessage({ message }) {
  return (
    <div className={`travel-message ${message.role === 'user' ? 'is-user' : 'is-assistant'}`}>
      {message.role !== 'user' && <div className="assistant-avatar"><Sparkles size={15} /></div>}
      <div className="message-bubble">
        {message.pending ? <span className="typing-line"><span /><span /><span /> {message.text}</span> : message.text}
      </div>
    </div>
  );
}

function DayCard({ day, itinerary, input, context, openReplace, setOpenReplace, onReplace }) {
  return (
    <article className="day-card">
      <div className="day-heading">
        <div>
          <span className="day-kicker">DAY {String(day.day).padStart(2, '0')}</span>
          <h3>{day.title}</h3>
        </div>
        <span className="day-cost">¥{formatMoney(day.slots.reduce((sum, item) => sum + item.cost, 60))}</span>
      </div>
      <div className="slot-list">
        {day.slots.map((item) => {
          const replaceKey = `${day.day}-${item.slot}`;
          const options = getReplacementOptions(input, item, itinerary, context);
          return (
            <div className="slot-item" key={item.id}>
              <div className="slot-time"><span>{item.slotLabel}</span><small>{item.time}</small></div>
              <img src={item.image} alt={`${item.name}示意图`} width="112" height="78" loading="lazy" />
              <div className="slot-copy">
                <div className="slot-title-row"><h4>{item.name}</h4><span className="slot-cost">¥{item.cost}</span></div>
                <div className="slot-meta"><span>{item.area}</span><span>{item.duration} 小时</span><span>{item.indoor ? '室内' : '室外'}</span></div>
                <p>{item.reason}</p>
                <div className="match-tags">{item.matchReasons.map((reason) => <span key={reason}>{reason}</span>)}</div>
              </div>
              <button
                className="icon-button replace-button"
                type="button"
                title={`替换${item.name}`}
                aria-label={`替换${item.name}`}
                onClick={() => setOpenReplace(openReplace === replaceKey ? '' : replaceKey)}
              >
                <RotateCcw size={16} />
              </button>
              {openReplace === replaceKey && (
                <div className="replace-menu">
                  <select aria-label={`选择${item.slotLabel}替换地点`} defaultValue="" onChange={(event) => onReplace(day.day, item, event.target.value)}>
                    <option value="">选择同城替换地点</option>
                    {options.map((option) => <option key={option.id} value={option.id}>{option.name} · ¥{option.cost}</option>)}
                  </select>
                  <ChevronDown size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
}

function TravelApp() {
  const [form, setForm] = useState(defaultInput);
  const [activeContext, setActiveContext] = useState({});
  const [itinerary, setItinerary] = useState(null);
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'assistant', text: '告诉我想去哪里、玩几天和预算，我会把景点排成一条能走得通的路线。' },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [savedPlans, setSavedPlans] = useState(readSavedPlans);
  const [openReplace, setOpenReplace] = useState('');
  const [lastRequest, setLastRequest] = useState({ input: defaultInput, context: {} });
  const [activeExample, setActiveExample] = useState('');
  const timersRef = useRef([]);
  const generationRef = useRef(0);

  const selectedCity = useMemo(() => travelCities.find((city) => city.name === form.city), [form.city]);

  useEffect(() => () => timersRef.current.forEach((timer) => window.clearTimeout(timer)), []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  const runGenerate = (nextInput = form, context = {}) => {
    clearTimers();
    const requestId = Date.now();
    const pendingId = `pending-${requestId}`;
    generationRef.current = requestId;
    setForm(nextInput);
    setActiveContext(context);
    setLastRequest({ input: nextInput, context });
    setError('');
    setIsGenerating(true);
    setStageIndex(0);
    setMessages((current) => [
      ...current.filter((message) => !message.pending),
      { id: `user-${requestId}`, role: 'user', text: formatRequest(nextInput) },
      { id: pendingId, role: 'assistant', pending: true, text: '先读取你的偏好' },
    ]);

    const stages = ['先读取你的偏好', '在本地城市数据里筛选', '检查预算和移动距离', '整理成逐日路线'];
    [360, 720, 1040].forEach((delay, index) => {
      timersRef.current.push(window.setTimeout(() => {
        if (generationRef.current !== requestId) return;
        setStageIndex(index + 1);
        setMessages((current) => current.map((message) => message.id === pendingId ? { ...message, text: stages[index + 1] } : message));
      }, delay));
    });
    timersRef.current.push(window.setTimeout(() => {
      if (generationRef.current !== requestId) return;
      const result = generateTravelResponse(nextInput, context);
      setIsGenerating(false);
      setStageIndex(4);
      setItinerary(result.ok ? result : null);
      setError(result.ok ? '' : result.error);
      setMessages((current) => [
        ...current.filter((message) => message.id !== pendingId),
        { id: `result-${requestId}`, role: 'assistant', text: result.ok ? `已为你排好 ${result.city} ${result.input.days} 天路线，预计花费 ¥${formatMoney(result.totalCost)}。每个地点都附了匹配理由，想换哪一站直接点循环箭头。` : result.error },
      ]);
      track('generate_plan', { city: nextInput.city, days: nextInput.days, budget: nextInput.budget, companion: nextInput.companion, interests: nextInput.interests, context });
      timersRef.current = [];
    }, 1280));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.city || !form.days || !form.budget) {
      setError('目的地、天数和预算都填好后再生成，行程才不会出现空白时段。');
      return;
    }
    runGenerate(form, {});
  };

  const stopGenerate = () => {
    if (!isGenerating) return;
    clearTimers();
    generationRef.current = 0;
    setIsGenerating(false);
    setMessages((current) => [
      ...current.filter((message) => !message.pending),
      { id: `stopped-${Date.now()}`, role: 'assistant', text: '已暂停这次规划。可以保留当前结果，也可以点击重试继续生成。' },
    ]);
    track('stop_generate', { city: form.city });
  };

  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const toggleInterest = (interest) => {
    setForm((current) => ({
      ...current,
      interests: current.interests.includes(interest) ? current.interests.filter((item) => item !== interest) : [...current.interests, interest],
    }));
  };

  const handleExample = (example) => {
    setActiveExample(example.id);
    setForm(example.input);
    runGenerate(example.input, {});
    track('select_example', { exampleId: example.id });
  };

  const handleQuickQuestion = (quickId) => {
    let nextInput = { ...form };
    let context = {};
    if (quickId === 'rainy') context = { weather: 'rainy' };
    if (quickId === 'budget') {
      nextInput = { ...nextInput, budget: Math.max(600, Math.round(Number(nextInput.budget || 1200) * 0.72 / 100) * 100) };
      context = { budgetMode: 'save' };
    }
    if (quickId === 'family') {
      nextInput = { ...nextInput, companion: '亲子', interests: [...new Set([...nextInput.interests, '亲子', '自然'])] };
    }
    if (quickId === 'walk') context = { walkLimit: 'low' };
    setToast('正在按这个条件重新排序');
    track('quick_question', { quickId, city: nextInput.city });
    runGenerate(nextInput, context);
  };

  const handleReplace = (dayNumber, currentItem, replacementId) => {
    if (!replacementId || !itinerary) return;
    const replacement = getReplacementOptions(itinerary.input, currentItem, itinerary, activeContext).find((option) => option.id === replacementId);
    if (!replacement) return;
    const days = itinerary.days.map((day) => day.day !== dayNumber ? day : {
      ...day,
      slots: day.slots.map((slot) => slot.id === currentItem.id ? { ...replacement, slot: slot.slot, slotLabel: slot.slotLabel, time: slot.time, score: currentItem.score } : slot),
    });
    const updated = recalculateItinerary(itinerary, days);
    setItinerary(updated);
    setOpenReplace('');
    setToast(`已替换为${replacement.name}，预算同步更新`);
    track('swap_poi', { city: form.city, from: currentItem.id, to: replacement.id, day: dayNumber, slot: currentItem.slot });
  };

  const handleSave = () => {
    if (!itinerary) return;
    const entry = {
      id: window.crypto?.randomUUID?.() || `${Date.now()}`,
      savedAt: new Date().toISOString(),
      input: itinerary.input,
      itinerary,
    };
    const next = [entry, ...savedPlans.filter((plan) => plan.input.city !== itinerary.input.city || plan.input.days !== itinerary.input.days)].slice(0, 6);
    setSavedPlans(next);
    localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    setToast('行程已保存到本机');
    track('save_plan', { city: itinerary.city, days: itinerary.input.days });
  };

  const handleShare = async () => {
    if (!itinerary) return;
    const summary = `${itinerary.city}${itinerary.input.days}天行程｜预计 ¥${itinerary.totalCost}\n${itinerary.days.map((day) => `Day ${day.day} ${day.slots.map((slot) => slot.name).join(' · ')}`).join('\n')}\n${window.location.origin}${window.location.pathname}#/travel`;
    try {
      await navigator.clipboard.writeText(summary);
      setToast('分享摘要已复制');
    } catch {
      window.prompt('复制这段分享摘要', summary);
    }
    track('share_plan', { city: itinerary.city, days: itinerary.input.days });
  };

  const loadPlan = (plan) => {
    setForm(plan.input);
    setItinerary(plan.itinerary);
    setActiveContext({});
    setError('');
    setMessages([{ id: `loaded-${plan.id}`, role: 'assistant', text: `已打开你保存的 ${plan.itinerary.city} 行程，可以继续替换地点或分享。` }]);
    setToast('已打开保存的行程');
  };

  const deletePlan = (planId) => {
    const next = savedPlans.filter((plan) => plan.id !== planId);
    setSavedPlans(next);
    localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    setToast('已从本机删除');
  };

  return (
    <main className="travel-shell">
      <div className="travel-app">
        <header className="travel-header">
          <Link className="travel-back" to="/" aria-label="返回作品集"><ArrowLeft size={18} /></Link>
          <div className="travel-brand"><span className="brand-dot"><Sparkles size={15} /></span><span>Tripwise / 本地规划实验室</span></div>
          <span className="local-badge"><span className="status-dot" />演示数据 · 本地推荐引擎</span>
        </header>

        <section className="travel-hero">
          <div className="hero-copy">
            <span className="eyebrow">AI TRAVEL ASSISTANT · DAY 8—11</span>
            <h1>把“想去走走”<br /><em>变成一张能出发的行程。</em></h1>
            <p>输入目的地、时间和预算，Tripwise 会根据兴趣、同行人和移动距离做出可解释的推荐。</p>
            <div className="hero-stats"><span><strong>3</strong> 城市</span><span><strong>45</strong> 地点</span><span><strong>0</strong> API Key</span></div>
          </div>
          <div className="hero-visual">
            <img src={selectedCity?.heroImage || selectedCity?.pois[0]?.image} alt={`${selectedCity?.name || '城市'}旅行插画`} width="520" height="300" />
            <div className="hero-location"><MapPin size={15} /><span>{selectedCity?.name || '选择目的地'} · {selectedCity?.mood || '准备出发'}</span></div>
          </div>
        </section>

        <div className="travel-layout">
          <aside className="travel-sidebar">
            <section className="travel-panel planner-panel">
              <div className="panel-heading"><div><span className="panel-kicker">PLAN YOUR TRIP</span><h2>先告诉我你的偏好</h2></div><span className="step-count">01 / 03</span></div>
              <form onSubmit={handleSubmit}>
                <fieldset className="form-group"><legend><MapPin size={15} />目的地</legend><div className="choice-grid city-choice-grid">{travelCities.map((city) => <button key={city.name} className={`city-choice ${form.city === city.name ? 'is-selected' : ''}`} type="button" onClick={() => updateForm('city', city.name)}><span className="city-initial">{city.shortName}</span><span>{city.name}</span>{form.city === city.name && <Check size={15} />}</button>)}</div></fieldset>
                <fieldset className="form-group"><legend><CalendarDays size={15} />玩几天</legend><div className="segmented-control">{[1, 2, 3, 4, 5].map((day) => <button key={day} className={Number(form.days) === day ? 'is-selected' : ''} type="button" onClick={() => updateForm('days', day)}>{day}<small>天</small></button>)}</div></fieldset>
                <fieldset className="form-group"><legend><WalletCards size={15} />总预算 <span className="field-hint">人均</span></legend><div className="budget-input"><span>¥</span><input type="number" min="300" step="100" value={form.budget} onChange={(event) => updateForm('budget', event.target.value)} aria-label="人均总预算" /><span className="budget-suffix">元</span></div><div className="budget-presets">{[900, 1500, 2200, 3200].map((budget) => <button key={budget} type="button" className={Number(form.budget) === budget ? 'is-selected' : ''} onClick={() => updateForm('budget', budget)}>¥{budget.toLocaleString()}</button>)}</div></fieldset>
                <fieldset className="form-group"><legend><Users size={15} />同行人</legend><div className="choice-grid companion-grid">{companionOptions.map((companion) => <button key={companion} className={`pill-choice ${form.companion === companion ? 'is-selected' : ''}`} type="button" onClick={() => updateForm('companion', companion)}>{companion}</button>)}</div></fieldset>
                <fieldset className="form-group"><legend>兴趣偏好 <span className="field-hint">可多选</span></legend><div className="choice-grid interest-grid">{interestOptions.map((interest) => <button key={interest} className={`pill-choice ${form.interests.includes(interest) ? 'is-selected' : ''}`} type="button" onClick={() => toggleInterest(interest)}>{interest}</button>)}</div></fieldset>
                <button className="generate-button" type="submit" disabled={isGenerating || !form.city || !form.days || !form.budget}>{isGenerating ? <><LoaderCircle className="spin" size={18} />正在规划</> : <><Sparkles size={18} />生成我的行程</>}</button>
              </form>
            </section>

            <section className="travel-panel examples-panel"><div className="panel-heading compact"><div><span className="panel-kicker">ONE-TAP START</span><h2>从一个示例开始</h2></div></div><div className="example-list">{travelExamples.map((example) => <button key={example.id} className={`example-item ${activeExample === example.id ? 'is-selected' : ''}`} type="button" onClick={() => handleExample(example)}><span className="example-icon"><Sparkles size={14} /></span><span><strong>{example.title}</strong><small>{example.meta}</small></span><ChevronDown className="example-arrow" size={15} /></button>)}</div></section>

            <section className="travel-panel saved-panel"><div className="panel-heading compact"><div><span className="panel-kicker">LOCAL LIBRARY</span><h2>保存的行程</h2></div><span className="saved-count">{savedPlans.length}/6</span></div>{savedPlans.length === 0 ? <p className="saved-empty">生成后点“保存”，行程会留在这台设备。</p> : <div className="saved-list">{savedPlans.map((plan) => <div className="saved-item" key={plan.id}><button type="button" onClick={() => loadPlan(plan)}><strong>{plan.itinerary.city} · {plan.input.days} 天</strong><span>¥{formatMoney(plan.itinerary.totalCost)} · {new Date(plan.savedAt).toLocaleDateString('zh-CN')}</span></button><button className="icon-button" type="button" title="删除保存的行程" aria-label="删除保存的行程" onClick={() => deletePlan(plan.id)}><Trash2 size={15} /></button></div>)}</div>}</section>
          </aside>

          <section className="travel-workspace">
            <section className="travel-panel assistant-panel"><div className="assistant-heading"><div><span className="panel-kicker">TRIPWISE CHAT</span><h2>你的旅行副驾驶</h2></div><span className="assistant-state"><span className="status-dot" />离线可用</span></div><div className="message-list" aria-live="polite">{messages.map((message) => <TravelMessage message={message} key={message.id} />)}</div><div className="quick-question-row">{quickQuestions.map(({ id, label, icon: Icon }) => <button type="button" key={id} onClick={() => handleQuickQuestion(id)} disabled={isGenerating}><Icon size={15} />{label}</button>)}</div>{isGenerating && <div className="generation-progress"><div><span>正在组合你的路线</span><strong>{stageIndex}/4</strong></div><div className="progress-track"><span style={{ width: `${Math.max(12, stageIndex * 25)}%` }} /></div><button type="button" className="stop-button" onClick={stopGenerate}><StopCircle size={15} />停止</button></div>}</section>

            {error && <div className="error-banner" role="alert"><CircleAlert size={18} /><span>{error}</span><button type="button" className="icon-button" title="重试生成" aria-label="重试生成" onClick={() => runGenerate(lastRequest.input, lastRequest.context)}><RefreshCw size={16} /></button></div>}

            {!itinerary && !isGenerating && !error && <section className="travel-panel empty-result"><div className="empty-orbit"><Sparkles size={23} /></div><h2>你的行程会出现在这里</h2><p>先在左侧选一个城市，或者直接试试上面的示例。</p><div className="empty-note"><Info size={15} />推荐结果来自本地规则，不需要登录和密钥。</div></section>}

            {itinerary && <section className="itinerary-section"><div className="itinerary-toolbar"><div><span className="panel-kicker">YOUR PLAN · {itinerary.city}</span><h2>{itinerary.input.days} 天城市行程</h2><p>{itinerary.mood} · {itinerary.input.companion}出行 · {itinerary.input.interests.length ? itinerary.input.interests.join(' / ') : '随心探索'}</p></div><div className="toolbar-actions"><button type="button" className="secondary-button" onClick={handleSave}><Bookmark size={16} />保存</button><button type="button" className="secondary-button" onClick={handleShare}><Share2 size={16} />分享</button><button type="button" className="primary-mini-button" onClick={() => runGenerate(lastRequest.input, lastRequest.context)} disabled={isGenerating}><RefreshCw size={16} />重新生成</button></div></div><div className="plan-notice"><div className="notice-icon"><Info size={17} /></div><p><strong>为什么这样排：</strong>{itinerary.engineNote}。预计花费含每天 ¥60 的市内移动缓冲，实际消费以现场为准。</p><span className={`budget-status ${itinerary.budgetStatus.tone}`}>{itinerary.budgetStatus.label} · {itinerary.budgetStatus.tone === 'good' ? `余 ¥${formatMoney(itinerary.budgetStatus.delta)}` : `超 ¥${formatMoney(itinerary.budgetStatus.delta)}`}</span></div><div className="day-list">{itinerary.days.map((day) => <DayCard key={day.day} day={day} itinerary={itinerary} input={itinerary.input} context={activeContext} openReplace={openReplace} setOpenReplace={setOpenReplace} onReplace={handleReplace} />)}</div><section className="budget-summary"><div><span>预计总花费</span><strong>¥{formatMoney(itinerary.totalCost)}</strong><small>门票 / 餐饮参考 + 市内移动缓冲</small></div><div className="budget-breakdown">{itinerary.dailyCosts.map((day) => <span key={day.day}>Day {day.day}<b>¥{formatMoney(day.cost)}</b></span>)}</div></section></section>}
          </section>
        </div>
        <footer className="travel-footer"><span><span className="footer-dot" />本地数据 · 规则可解释 · 无账号</span><span>下一步可接入真实模型适配层</span></footer>
      </div>
      {toast && <div className="toast" role="status"><Check size={16} />{toast}</div>}
    </main>
  );
}

export default TravelApp;
