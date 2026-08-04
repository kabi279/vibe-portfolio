import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { taskTemplates } from '../data/taskData';

const TaskContext = createContext(null);
const dayKey = () => new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const freshTask = (template, date) => ({ ...template, progress: 0, status: 'available', cycleDate: date, eventKeys: [] });

function loadTasks() {
  const today = dayKey();
  try {
    const parsed = JSON.parse(localStorage.getItem('mall_tasks') || '[]');
    const saved = Array.isArray(parsed) ? parsed : [];
    return taskTemplates.map((template) => {
      const existing = saved.find((task) => task.id === template.id);
      if (!existing || (template.limit === 'daily' && existing.cycleDate !== today)) return freshTask(template, today);
      return { ...freshTask(template, today), ...existing, eventKeys: Array.isArray(existing.eventKeys) ? existing.eventKeys : [] };
    });
  } catch {
    return taskTemplates.map((template) => freshTask(template, today));
  }
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => { localStorage.setItem('mall_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => {
    const resetExpiredDailyTasks = () => {
      const today = dayKey();
      setTasks((current) => current.map((task) => task.limit === 'daily' && task.cycleDate !== today ? freshTask(task, today) : task));
    };
    window.addEventListener('focus', resetExpiredDailyTasks);
    return () => window.removeEventListener('focus', resetExpiredDailyTasks);
  }, []);

  const updateTaskProgress = useCallback((trigger, increment = 1, eventKey) => {
    const amount = Math.max(1, Number(increment) || 1);
    setTasks((current) => current.map((task) => {
      if (task.trigger !== trigger || task.status === 'claimed' || task.status === 'completed') return task;
      if (eventKey && task.eventKeys.includes(eventKey)) return task;
      const progress = Math.min(task.target, task.progress + amount);
      return { ...task, progress, status: progress >= task.target ? 'completed' : 'in_progress', eventKeys: eventKey ? [...task.eventKeys, eventKey] : task.eventKeys };
    }));
  }, []);

  const claimTaskReward = useCallback((taskId) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task || task.status !== 'completed') return 0;
    setTasks((current) => current.map((item) => item.id === taskId ? { ...item, status: 'claimed' } : item));
    return Number(task.reward) || 0;
  }, [tasks]);

  const summary = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter((task) => task.status === 'completed').length,
    claimed: tasks.filter((task) => task.status === 'claimed').length,
    availablePoints: tasks.filter((task) => task.status === 'completed').reduce((sum, task) => sum + Number(task.reward || 0), 0),
  }), [tasks]);

  const value = useMemo(() => ({ tasks, updateTaskProgress, claimTaskReward, summary }), [tasks, updateTaskProgress, claimTaskReward, summary]);
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};
