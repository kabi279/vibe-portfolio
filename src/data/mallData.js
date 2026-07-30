// src/data/mallData.js
export const mallData = [
  // ===== 出行服务类 =====
  {
    id: 'P001',
    name: '机场贵宾厅体验券',
    image: '/images/lounge.jpg',
    points: 800,
    price: 0.01,
    category: '出行服务',
    level: '银卡',
    stock: 50,
    tags: ['舒适', '商务'],
    desc: '享受机场贵宾厅休息、茶点、Wi-Fi服务，让候机更舒适。',
    rules: '仅限本人使用，需提前2小时预约。'
  },
  {
    id: 'P002',
    name: '接送机优惠券（50元）',
    image: '/images/transfer.jpg',
    points: 300,
    price: 0.01,
    category: '出行服务',
    level: '银卡',
    stock: 100,
    tags: ['省钱', '便捷'],
    desc: '接送机立减50元，覆盖全国主要城市机场。',
    rules: '单笔订单限用1张，不可叠加。'
  },
  {
    id: 'P003',
    name: '酒店升房券',
    image: '/images/hotel.jpg',
    points: 600,
    price: 0.01,
    category: '出行服务',
    level: '金卡',
    stock: 30,
    tags: ['品质', '升级'],
    desc: '预订合作酒店可免费升级房型（视当日房态而定）。',
    rules: '需通过指定渠道预订，升级以酒店实际房态为准。'
  },

  // ===== 数字权益类（异业合作） =====
  {
    id: 'P004',
    name: '爱奇艺VIP周卡',
    image: '/images/iqiyi.jpg',
    points: 150,
    price: 0.01,
    category: '数字权益',
    level: '银卡',
    stock: 200,
    tags: ['追剧', '热播'],
    desc: '爱奇艺VIP周卡，海量大片、热播剧集任你刷。',
    rules: '兑换后7天内有效，需在爱奇艺App内激活。'
  },
  {
    id: 'P005',
    name: '腾讯视频VIP月卡',
    image: '/images/tencent.jpg',
    points: 400,
    price: 0.01,
    category: '数字权益',
    level: '金卡',
    stock: 150,
    tags: ['综艺', '独播'],
    desc: '腾讯视频VIP月卡，独家综艺、热播剧集抢先看。',
    rules: '兑换后30天内有效，需在腾讯视频App内激活。'
  },
  {
    id: 'P006',
    name: '话费充值券（10元）',
    image: '/images/phone.jpg',
    points: 200,
    price: 0.01,
    category: '数字权益',
    level: '银卡',
    stock: 500,
    tags: ['实用', '通用'],
    desc: '10元话费充值券，移动/联通/电信三网通用。',
    rules: '兑换后7天内有效，充值金额不可提现。'
  },

  // ===== 生活好物类 =====
  {
    id: 'P007',
    name: '品牌纸巾组合包',
    image: '/images/tissue.jpg',
    points: 100,
    price: 0.01,
    category: '生活好物',
    level: '银卡',
    stock: 300,
    tags: ['实用', '居家'],
    desc: '品牌纸巾组合包（抽纸3包+手帕纸5包），日常必备。',
    rules: '每个会员每月限兑2件。'
  },
  {
    id: 'P008',
    name: '便携登山包（20L）',
    image: '/images/backpack.jpg',
    points: 1200,
    price: 0.01,
    category: '生活好物',
    level: '铂金卡',
    stock: 20,
    tags: ['户外', '限量'],
    desc: '轻便耐磨登山包，适合短途徒步和城市通勤。',
    rules: '铂金卡专属商品，限量兑换，每人限兑1件。'
  }
];