const STORAGE_KEY = 'portfolio_events';

export function track(eventName, properties = {}) {
  const event = { eventName, properties, createdAt: new Date().toISOString() };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const events = Array.isArray(saved) ? saved : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...events.slice(-99), event]));
  } catch {
    // Analytics must never block a primary user action.
  }
  if (import.meta.env.DEV) console.info('[track]', eventName, properties);
}

export function readTrackedEvents() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}
