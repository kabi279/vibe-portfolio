# 作品集统一埋点事件清单

## 一、会员权益商城（Mall）

| 事件名称 | 触发时机 | 携带参数（properties） | 用途说明 |
| :--- | :--- | :--- | :--- |
| `view_item` | 用户点击商品卡片，进入详情页 | `product_id`, `category`, `user_level` | 衡量商品吸引力 |
| `add_to_cart` | 点击“加入购物车”按钮 | `product_id`, `points`, `quantity`, `category` | 加购转化率 |
| `begin_checkout` | 进入结算/确认订单页 | `cart_total`, `coupon_count`, `item_count` | 结算漏斗起点 |
| `redeem_success` | 模拟兑换成功（生成订单） | `order_id`, `total_points`, `user_level`, `product_ids` | 核心转化指标 |
| `view_member_center` | 进入会员中心页面 | `user_level`, `total_points` | 会员页访问深度 |

---

## 二、AI 旅游助手（Travel）

| 事件名称 | 触发时机 | 携带参数（properties） | 用途说明 |
| :--- | :--- | :--- | :--- |
| `generate_plan` | 点击“生成行程”按钮提交需求 | `destination`, `days`, `budget`, `companion`, `interests` | 行程生成请求量 |
| `swap_poi` | 点击某个地点的“替换”按钮 | `city`, `day_index`, `old_poi_id`, `new_poi_id` | 功能使用深度 |
| `click_booking` | 点击酒店或交通方案的“预订”按钮 | `booking_type`（hotel / transport）, `item_id`, `price` | 预订意愿起点 |
| `begin_checkout_travel` | 进入预订结算页（选完房型/班次后） | `booking_type`, `total_amount`, `hotel_name` 或 `route` | 预订漏斗第二步 |
| `booking_success` | 模拟预订成功（生成虚拟订单） | `booking_id`, `total_amount`, `points_deducted`, `booking_type` | 预订核心转化 |
| `save_plan` | 点击“保存行程”按钮 | `itinerary_id`, `city`, `days`, `total_cost` | 留存意愿衡量 |

---

## 三、跨项目通用/辅助事件（可选）

| 事件名称 | 触发时机 | 携带参数（properties） | 用途说明 |
| :--- | :--- | :--- | :--- |
| `page_view` | 路由切换（#/mall, #/travel 等） | `page_name`, `referrer` | 页面访问量（PV） |
| `click_nav` | 点击底部导航栏 | `tab_name`（mall / travel / home） | 导航点击热区 |

---

## 四、开发备注

1. **存储方式**：通过 `src/utils/track.js` 中的 `track(eventName, properties)` 函数触发，暂时只打印到控制台并存入 `localStorage`（键名：`tracking_logs`），不上报真实服务器。

2. **命名规范**：所有事件名和参数统一使用 **snake_case**（下划线命名）。

3. **隐私合规**：不记录用户手机号、设备 ID 等隐私信息，只记录行为与商品/行程 ID。

4. **漏斗对齐**：
   - 商城漏斗：`view_item` → `add_to_cart` → `begin_checkout` → `redeem_success`
   - 旅游预订漏斗：`generate_plan` → `click_booking` → `begin_checkout_travel` → `booking_success`