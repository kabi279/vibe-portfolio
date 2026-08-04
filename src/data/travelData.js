const BASE_URL = import.meta.env?.BASE_URL || '/';
const citySlug = { 上海: 'shanghai', 杭州: 'hangzhou', 成都: 'chengdu' };
const cityImage = (city) => `${BASE_URL}images/travel/${citySlug[city]}.svg`;
const cityHero = (city) => `${BASE_URL}images/travel/${citySlug[city]}-hero.jpg`;
const poi = (city, id, details) => ({
  id: `${city}-${id}`,
  city,
  image: cityImage(city),
  ...details,
});

export const travelCities = [
  {
    name: '上海',
    shortName: 'SH',
    heroImage: cityHero('上海'),
    mood: '天际线、老街与一口鲜甜',
    description: '把摩登城市和街巷烟火排在同一张行程里。',
    pois: [
      poi('上海', 'bund', { name: '外滩夜景', tags: ['夜景', '摄影', '慢游'], duration: 2, cost: 0, area: '黄浦', indoor: false, timeSlots: ['evening'], walkLevel: 2, reason: '沿江视野开阔，适合把第一晚的节奏放慢。' }),
      poi('上海', 'museum', { name: '上海博物馆', tags: ['文化', '亲子'], duration: 2.5, cost: 0, area: '人民广场', indoor: true, timeSlots: ['morning', 'afternoon'], walkLevel: 1, reason: '室内动线清晰，雨天也能稳稳看完一圈。' }),
      poi('上海', 'yuyuan', { name: '豫园与城隍庙', tags: ['文化', '美食', '购物'], duration: 2, cost: 60, area: '豫园', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 2, reason: '园林、点心和老字号集中，第一次来上海不容易踩空。' }),
      poi('上海', 'zhujiajiao', { name: '朱家角古镇', tags: ['慢游', '美食', '摄影'], duration: 4, cost: 120, area: '青浦', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 3, reason: '水乡节奏慢，适合想暂时离开高楼的人。' }),
      poi('上海', 'tianzifang', { name: '田子坊', tags: ['文化', '购物', '美食'], duration: 2, cost: 80, area: '打浦桥', indoor: false, timeSlots: ['afternoon', 'evening'], walkLevel: 2, reason: '小店密度高，适合边走边挑伴手礼。' }),
      poi('上海', 'lujiazui', { name: '陆家嘴观景', tags: ['夜景', '摄影'], duration: 2, cost: 180, area: '浦东', indoor: true, timeSlots: ['afternoon', 'evening'], walkLevel: 2, reason: '把城市尺度一次看明白，适合情侣或朋友同行。' }),
      poi('上海', 'wukang', { name: '武康路街区', tags: ['慢游', '摄影', '咖啡'], duration: 2.5, cost: 30, area: '徐汇', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 3, reason: '梧桐树影和街角咖啡，适合不赶景点的半天。' }),
      poi('上海', 'astronomy', { name: '上海天文馆', tags: ['亲子', '文化'], duration: 3, cost: 100, area: '临港', indoor: true, timeSlots: ['morning', 'afternoon'], walkLevel: 2, reason: '沉浸式展陈对亲子友好，室内停留时间也够长。' }),
      poi('上海', 'disneytown', { name: '迪士尼小镇', tags: ['亲子', '美食', '夜景'], duration: 3, cost: 160, area: '浦东', indoor: false, timeSlots: ['afternoon', 'evening'], walkLevel: 2, reason: '不买门票也能逛吃拍照，给行程留一点轻松收尾。' }),
      poi('上海', 'jingansi', { name: '静安寺与愚园路', tags: ['文化', '慢游', '摄影'], duration: 2, cost: 50, area: '静安', indoor: true, timeSlots: ['morning', 'afternoon'], walkLevel: 1, reason: '寺院和街区挨得近，少走路也能完成一段城市漫游。' }),
      poi('上海', 'science', { name: '上海科技馆', tags: ['亲子', '文化'], duration: 2.5, cost: 60, area: '浦东', indoor: true, timeSlots: ['morning', 'afternoon'], walkLevel: 1, reason: '互动展项多，适合把亲子半天安排得轻松一点。' }),
      poi('上海', 'natural-history', { name: '上海自然博物馆', tags: ['亲子', '文化'], duration: 2.5, cost: 0, area: '静安', indoor: true, timeSlots: ['morning', 'afternoon'], walkLevel: 1, reason: '免费室内展馆，预算紧或下雨时都很稳。' }),
      poi('上海', 'river-cruise', { name: '黄浦江夜游', tags: ['夜景', '摄影'], duration: 2, cost: 150, area: '外滩', indoor: true, timeSlots: ['evening'], walkLevel: 1, reason: '用一段水上视角换个方式看城市灯光。' }),
      poi('上海', 'anfu', { name: '安福路街区', tags: ['美食', '购物', '慢游'], duration: 2, cost: 70, area: '徐汇', indoor: false, timeSlots: ['afternoon', 'evening'], walkLevel: 2, reason: '小店和餐厅集中，适合安排一段随走随停的时间。' }),
      poi('上海', 'tianai', { name: '甜爱路散步', tags: ['摄影', '慢游'], duration: 1.5, cost: 20, area: '虹口', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 2, reason: '短距离街区散步，给高密度行程留一点呼吸。' }),
    ],
  },
  {
    name: '杭州',
    shortName: 'HZ',
    heroImage: cityHero('杭州'),
    mood: '湖风、茶香与一段不赶路的下午',
    description: '把西湖的松弛感和杭州的城市新鲜感放在一起。',
    pois: [
      poi('杭州', 'brokenbridge', { name: '西湖断桥', tags: ['自然', '摄影', '慢游'], duration: 2, cost: 0, area: '西湖', indoor: false, timeSlots: ['morning', 'evening'], walkLevel: 2, reason: '视野开阔、进入门槛低，适合用一段湖边散步开场。' }),
      poi('杭州', 'lingyin', { name: '灵隐寺', tags: ['文化', '慢游'], duration: 3, cost: 75, area: '西湖西线', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 3, reason: '山林和古刹连在一起，喜欢安静文化线会很合适。' }),
      poi('杭州', 'xixi', { name: '西溪湿地', tags: ['自然', '亲子', '慢游'], duration: 3, cost: 80, area: '西溪', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 2, reason: '船行和步道可以灵活切换，亲子同行不容易无聊。' }),
      poi('杭州', 'tea-museum', { name: '中国茶叶博物馆', tags: ['文化', '美食', '亲子'], duration: 2, cost: 40, area: '龙井', indoor: true, timeSlots: ['morning', 'afternoon'], walkLevel: 1, reason: '室内展陈配茶园景观，天气变化时也有备选。' }),
      poi('杭州', 'longjing', { name: '龙井村', tags: ['自然', '美食', '慢游'], duration: 3, cost: 120, area: '西湖西线', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 3, reason: '茶园视野和一杯现泡龙井，适合把下午过得慢一点。' }),
      poi('杭州', 'liangzhu', { name: '良渚博物院', tags: ['文化', '亲子'], duration: 2.5, cost: 0, area: '余杭', indoor: true, timeSlots: ['morning', 'afternoon'], walkLevel: 1, reason: '展厅节奏友好，历史线索清楚，适合亲子一起看。' }),
      poi('杭州', 'hefanga', { name: '河坊街', tags: ['美食', '购物', '夜景'], duration: 2, cost: 80, area: '吴山', indoor: false, timeSlots: ['afternoon', 'evening'], walkLevel: 2, reason: '小吃和手作集中，适合晚上边逛边解决晚餐。' }),
      poi('杭州', 'canal', { name: '京杭大运河拱宸桥', tags: ['文化', '慢游', '摄影'], duration: 2, cost: 60, area: '拱墅', indoor: false, timeSlots: ['afternoon', 'evening'], walkLevel: 2, reason: '桥、河和夜色都在一条线上，移动成本比较低。' }),
      poi('杭州', 'lakeside', { name: '湖滨步行街', tags: ['购物', '美食', '夜景'], duration: 2.5, cost: 120, area: '湖滨', indoor: false, timeSlots: ['afternoon', 'evening'], walkLevel: 2, reason: '适合最后一晚收尾，吃饭、买东西和看湖都方便。' }),
      poi('杭州', 'botanical', { name: '杭州植物园', tags: ['自然', '亲子', '慢游'], duration: 2.5, cost: 30, area: '西湖西线', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 2, reason: '花木和小径密度舒服，预算紧时也能保留自然体验。' }),
      poi('杭州', 'yuewang', { name: '岳王庙', tags: ['文化', '慢游'], duration: 2, cost: 25, area: '西湖', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 1, reason: '文化线短而集中，适合和西湖边的慢游串联。' }),
      poi('杭州', 'huxueyan', { name: '胡雪岩故居', tags: ['文化', '摄影'], duration: 1.5, cost: 20, area: '吴山', indoor: true, timeSlots: ['afternoon'], walkLevel: 1, reason: '园宅细节丰富，雨天也能保留一段江南味道。' }),
      poi('杭州', 'jiuxi', { name: '九溪烟树', tags: ['自然', '慢游', '摄影'], duration: 3, cost: 0, area: '西湖西线', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 3, reason: '溪流和林荫道适合喜欢自然的人，但需要预留脚力。' }),
      poi('杭州', 'qianjiang', { name: '钱塘江夜景', tags: ['夜景', '摄影', '慢游'], duration: 2, cost: 0, area: '滨江', indoor: false, timeSlots: ['evening'], walkLevel: 2, reason: '不花门票也能看城市夜色，低预算收尾很友好。' }),
      poi('杭州', 'paradise', { name: '杭州乐园', tags: ['亲子', '夜景'], duration: 4, cost: 180, area: '萧山', indoor: false, timeSlots: ['afternoon', 'evening'], walkLevel: 2, reason: '亲子出行想要更强体验感时，可以把它作为一天主线。' }),
    ],
  },
  {
    name: '成都',
    shortName: 'CD',
    heroImage: cityHero('成都'),
    mood: '熊猫、茶馆和不急着回消息的夜晚',
    description: '用一条低预算也成立的城市路线，吃好、走少、看得多。',
    pois: [
      poi('成都', 'kuanzhai', { name: '宽窄巷子', tags: ['美食', '文化', '夜景'], duration: 2.5, cost: 70, area: '青羊', indoor: false, timeSlots: ['afternoon', 'evening'], walkLevel: 2, reason: '老建筑和小吃集中，第一次到成都可以快速找到感觉。' }),
      poi('成都', 'panda', { name: '成都大熊猫繁育研究基地', tags: ['亲子', '自然', '摄影'], duration: 3, cost: 58, area: '成华', indoor: false, timeSlots: ['morning'], walkLevel: 2, reason: '早上熊猫更活跃，亲子和第一次来成都都值得排。' }),
      poi('成都', 'wuhou', { name: '武侯祠', tags: ['文化', '摄影'], duration: 2, cost: 50, area: '武侯', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 2, reason: '三国文化线索集中，和锦里可以顺路安排。' }),
      poi('成都', 'jinli', { name: '锦里古街', tags: ['美食', '夜景', '文化'], duration: 2, cost: 60, area: '武侯', indoor: false, timeSlots: ['afternoon', 'evening'], walkLevel: 2, reason: '夜间氛围稳定，小吃选择多，预算弹性也大。' }),
      poi('成都', 'dufu', { name: '杜甫草堂', tags: ['文化', '慢游', '自然'], duration: 2.5, cost: 50, area: '青羊', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 2, reason: '园林和诗歌一起看，适合喜欢慢节奏文化体验的人。' }),
      poi('成都', 'eastern-memory', { name: '东郊记忆', tags: ['文化', '摄影', '夜景'], duration: 2.5, cost: 30, area: '成华', indoor: false, timeSlots: ['afternoon', 'evening'], walkLevel: 2, reason: '旧厂房和展览并置，拍照好看且花费不高。' }),
      poi('成都', 'people-park', { name: '人民公园喝盖碗茶', tags: ['慢游', '美食', '亲子'], duration: 2, cost: 20, area: '青羊', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 1, reason: '一杯茶就能把成都的生活感喝出来，走路也少。' }),
      poi('成都', 'qingcheng', { name: '青城山', tags: ['自然', '慢游'], duration: 5, cost: 110, area: '都江堰', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 3, reason: '想把自然安排进城市周末时，可以用它替换一段市区路线。' }),
      poi('成都', 'chengdu-museum', { name: '成都博物馆', tags: ['文化', '亲子'], duration: 2.5, cost: 0, area: '天府广场', indoor: true, timeSlots: ['morning', 'afternoon'], walkLevel: 1, reason: '免费且室内，预算紧或下雨时都能保持行程完整。' }),
      poi('成都', 'jiuyanqiao', { name: '九眼桥夜色', tags: ['夜景', '美食', '摄影'], duration: 2, cost: 100, area: '锦江', indoor: false, timeSlots: ['evening'], walkLevel: 2, reason: '河岸夜景和小酒馆集中，适合给最后一晚加一点热闹。' }),
      poi('成都', 'jinsha', { name: '金沙遗址博物馆', tags: ['文化', '亲子'], duration: 2.5, cost: 70, area: '青羊', indoor: true, timeSlots: ['morning', 'afternoon'], walkLevel: 1, reason: '室内展馆和遗址公园结合，文化线索清晰。' }),
      poi('成都', 'tianfu-square', { name: '天府广场', tags: ['摄影', '慢游'], duration: 1.5, cost: 0, area: '青羊', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 1, reason: '市中心短停留，适合把交通间隙变成一个小景点。' }),
      poi('成都', 'chunxi', { name: '春熙路与太古里', tags: ['购物', '美食', '夜景'], duration: 2.5, cost: 120, area: '锦江', indoor: true, timeSlots: ['afternoon', 'evening'], walkLevel: 2, reason: '商圈密度高，购物和吃饭可以一次完成。' }),
      poi('成都', 'wenshu', { name: '文殊院', tags: ['文化', '慢游', '美食'], duration: 2, cost: 20, area: '青羊', indoor: false, timeSlots: ['morning', 'afternoon'], walkLevel: 1, reason: '寺院、茶馆和小吃挨得近，低预算也有城市层次。' }),
      poi('成都', 'yulin', { name: '玉林路夜食', tags: ['美食', '夜景', '摄影'], duration: 2, cost: 100, area: '武侯', indoor: false, timeSlots: ['evening'], walkLevel: 2, reason: '把成都的夜生活留给街边小店，适合朋友同行。' }),
    ],
  },
];

export const travelExamples = [
  {
    id: 'shanghai-foodie',
    title: '上海周末吃喝',
    meta: '2 天 · 情侣 · 美食夜景',
    input: { city: '上海', days: 2, budget: 1800, companion: '情侣', interests: ['美食', '夜景'] },
  },
  {
    id: 'hangzhou-family',
    title: '杭州亲子慢游',
    meta: '3 天 · 亲子 · 自然文化',
    input: { city: '杭州', days: 3, budget: 2200, companion: '亲子', interests: ['亲子', '自然', '文化'] },
  },
  {
    id: 'chengdu-budget',
    title: '成都低预算路线',
    meta: '2 天 · 朋友 · 美食夜景',
    input: { city: '成都', days: 2, budget: 900, companion: '朋友', interests: ['美食', '夜景'] },
  },
];

export const interestOptions = ['美食', '自然', '文化', '亲子', '夜景', '慢游', '购物', '摄影'];
export const companionOptions = ['独自', '情侣', '朋友', '亲子'];
