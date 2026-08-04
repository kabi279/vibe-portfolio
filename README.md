# Vibe Portfolio

这是一个围绕会员运营和旅行体验制作的 React + Vite 作品集 Demo，包含两个可交互项目：

- `#/mall`：会员权益商城，支持积分、签到、权益详情、购物车、模拟兑换和任务中心。
- `#/travel`：AI 旅游助手，支持上海、杭州、成都三城，1-5 天、预算、同行人和兴趣偏好输入。

## 本地运行

```bash
npm install
npm run dev
```

构建生产版本：

```bash
npm run build
```

如果当前 Windows 环境的默认 Vite 配置加载器被沙箱拦截，可以使用：

```bash
npm run build -- --configLoader native
```

## 旅游助手主路径

1. 选择目的地、天数、预算、同行人和兴趣。
2. 生成逐日行程，结果会展示每个地点的匹配理由、时段和预算。
3. 用快捷问题切换雨天、低预算、亲子或少走路偏好。
4. 用循环箭头替换同城同时间段的地点，预算会同步计算。
5. 保存到本机，或复制包含日期、城市和作品链接的分享摘要。

推荐引擎位于 `src/utils/generateItinerary.js`，数据位于 `src/data/travelData.js`。当前版本使用本地 JSON 数据和规则评分，离线可用，不需要登录、付款或 API Key；后续可在 `generateTravelResponse` 接入真实模型适配层。

## 验收范围

已覆盖三城市的 1-5 天排期、地点去重、预算校验、雨天/低预算/少走路规则、保存和替换状态。商城的购物车和任务上下文也对 localStorage 异常、库存为 0 和数量边界做了保护。
