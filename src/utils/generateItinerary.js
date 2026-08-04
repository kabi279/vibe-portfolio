import { travelCities } from '../data/travelData.js';

export const SLOT_META = {
  morning: { label: '上午', time: '09:00 - 12:00' },
  afternoon: { label: '下午', time: '14:00 - 17:30' },
  evening: { label: '晚上', time: '18:30 - 21:00' },
};

const companionTags = {
  独自: ['慢游', '摄影', '文化'],
  情侣: ['夜景', '摄影', '美食'],
  朋友: ['美食', '夜景', '购物'],
  亲子: ['亲子', '自然', '文化'],
};

const getCity = (cityName) => travelCities.find((city) => city.name === cityName);

export function normalizeTripInput(input = {}) {
  const city = typeof input.city === 'string' ? input.city : '';
  const rawDays = Number(input.days);
  const days = Number.isFinite(rawDays) ? Math.max(0, Math.floor(rawDays)) : 0;
  const budget = Math.max(0, Number(input.budget) || 0);
  return {
    city,
    days,
    budget,
    companion: input.companion || '独自',
    interests: Array.isArray(input.interests) ? input.interests : [],
  };
}

export function scorePoi(place, input, context = {}, slot) {
  let score = 0;
  const matched = [];
  const interests = input.interests || [];
  const companionPreference = companionTags[input.companion] || [];
  const dailyBudget = input.budget / Math.max(input.days, 1);

  interests.forEach((interest) => {
    if (place.tags.includes(interest)) {
      score += 5;
      matched.push(`${interest}匹配`);
    }
  });
  companionPreference.forEach((interest) => {
    if (place.tags.includes(interest)) score += 1.5;
  });
  if (place.timeSlots.includes(slot)) score += 3;
  if (place.cost <= Math.max(100, dailyBudget / 2)) {
    score += 2;
    matched.push('预算友好');
  } else if (place.cost > dailyBudget * 0.75) {
    score -= 2;
  }
  if (context.weather === 'rainy') {
    score += place.indoor ? 5 : -6;
    if (place.indoor) matched.push('雨天友好');
  }
  if (context.budgetMode === 'save') {
    score += place.cost <= 60 ? 4 : -Math.min(4, place.cost / 70);
    if (place.cost <= 60) matched.push('低预算');
  }
  if (context.walkLimit === 'low') {
    score += place.walkLevel <= 1 ? 4 : -place.walkLevel * 1.5;
    if (place.walkLevel <= 1) matched.push('少走路');
  }
  if (input.companion === '亲子' && place.tags.includes('亲子')) matched.push('亲子适配');
  if (input.companion === '情侣' && place.tags.includes('夜景')) matched.push('适合约会');
  if (matched.length === 0) matched.push('城市精选');

  return { score, matched: [...new Set(matched)].slice(0, 3) };
}

function pickPlaces(city, input, context, usedIds = new Set()) {
  const places = city.pois.filter((place) => !usedIds.has(place.id));
  const picks = {};
  Object.keys(SLOT_META).forEach((slot) => {
    picks[slot] = places
      .filter((place) => place.timeSlots.includes(slot))
      .map((place) => ({ place, ...scorePoi(place, input, context, slot) }))
      .sort((a, b) => b.score - a.score || a.place.cost - b.place.cost);
  });
  return picks;
}

function budgetStatus(totalCost, budget) {
  if (totalCost <= budget) return { tone: 'good', label: '在预算内', delta: budget - totalCost };
  const over = totalCost - budget;
  return { tone: over / Math.max(budget, 1) > 0.2 ? 'over' : 'close', label: '略超预算', delta: over };
}

export function recalculateItinerary(itinerary, days) {
  const dailyCosts = days.map((day) => ({
    day: day.day,
    cost: day.slots.reduce((sum, item) => sum + item.cost, 60),
  }));
  const totalCost = dailyCosts.reduce((sum, item) => sum + item.cost, 0);
  return { ...itinerary, days, dailyCosts, totalCost, budgetStatus: budgetStatus(totalCost, itinerary.input.budget) };
}

export function generateTravelResponse(rawInput, context = {}) {
  const input = normalizeTripInput(rawInput);
  const city = getCity(input.city);
  if (!city) return { ok: false, error: '请选择一个目的地后再生成行程。', input };
  if (!input.days || input.days < 1 || input.days > 5) return { ok: false, error: '行程天数需要在 1-5 天之间。', input };
  if (!input.budget || input.budget < 300) return { ok: false, error: '预算至少填写 300 元，才能排出可执行的路线。', input };

  const usedIds = new Set();
  const days = [];
  for (let dayIndex = 0; dayIndex < input.days; dayIndex += 1) {
    const picks = pickPlaces(city, input, context, usedIds);
    const slots = Object.keys(SLOT_META).map((slot) => {
      const available = picks[slot] || [];
      const choice = available.find(({ place }) => !usedIds.has(place.id));
      if (!choice) return null;
      usedIds.add(choice.place.id);
      const meta = SLOT_META[slot];
      return {
        ...choice.place,
        slot,
        slotLabel: meta.label,
        time: meta.time,
        matchReasons: choice.matched,
        score: Math.round(choice.score * 10) / 10,
      };
    }).filter(Boolean);

    if (slots.length === 0) break;
    days.push({ day: dayIndex + 1, title: dayIndex === 0 ? '抵达与城市第一印象' : dayIndex === input.days - 1 ? '把喜欢的地方再看一遍' : '城市深呼吸日', slots });
  }

  if (days.length < input.days) {
    return { ok: false, error: '当前偏好太集中，暂时排不满每天 3 个时段。试试减少兴趣或降低步行限制。', input };
  }

  const itinerary = recalculateItinerary({
    ok: true,
    city: city.name,
    cityDescription: city.description,
    mood: city.mood,
    input,
    days,
    generatedAt: new Date().toISOString(),
    engineNote: '基于本地城市数据、兴趣标签、预算与同行人规则生成',
  }, days);
  return { ...itinerary, budgetStatus: budgetStatus(itinerary.totalCost, input.budget) };
}

export function getReplacementOptions(input, currentItem, itinerary, context = {}) {
  const city = getCity(input.city);
  if (!city) return [];
  const usedIds = new Set(itinerary.days.flatMap((day) => day.slots.map((slot) => slot.id)));
  return city.pois
    .filter((place) => !usedIds.has(place.id) && place.timeSlots.includes(currentItem.slot))
    .map((place) => ({ place, ...scorePoi(place, input, context, currentItem.slot) }))
    .sort((a, b) => b.score - a.score || a.place.cost - b.place.cost)
    .slice(0, 6)
    .map(({ place, matched }) => ({ ...place, matchReasons: matched }));
}




