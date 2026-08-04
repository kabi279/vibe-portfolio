export const taskTemplates = [
  { id: 'daily_checkin', name: '每日签到', desc: '点击签到按钮，开启元气满满的一天', icon: '☀️', reward: 50, limit: 'daily', trigger: 'checkin', target: 1 },
  { id: 'first_order', name: '首单兑换', desc: '完成你的第一笔权益兑换订单', icon: '🎁', reward: 100, limit: 'once', trigger: 'redeem', target: 1 },
  { id: 'share_friend', name: '分享给好友', desc: '把商城分享给好友，一起发现会员权益', icon: '↗️', reward: 30, limit: 'daily', trigger: 'share', target: 1 },
  { id: 'browse_products', name: '浏览 3 个商品', desc: '查看不同的权益商品详情', icon: '◌', reward: 20, limit: 'daily', trigger: 'browse', target: 3 },
  { id: 'add_cart_items', name: '加购 2 件商品', desc: '把心仪的权益加入购物袋', icon: '🛍️', reward: 15, limit: 'daily', trigger: 'add_cart', target: 2 },
];