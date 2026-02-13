# 后端部署指南（Railway / Render）

支付服务（`server/`）需要单独部署。推荐使用 **Railway** 或 **Render**。

---

## 方式一：Railway（推荐）

### 1. 准备
- 把代码推送到 GitHub
- 访问 [railway.app](https://railway.app)，用 GitHub 登录

### 2. 创建项目
1. 点击 **New Project**
2. 选择 **Deploy from GitHub repo**
3. 连接 GitHub，选择 `onesiponebrush-site` 仓库

### 3. 配置
1. 部署后，点击项目进入 **Settings**
2. **Root Directory**：留空（使用仓库根目录）
3. **Build Command**：留空或填 `npm install`
4. **Start Command**：填 `node server/index.js`
5. 如未设置，在 **Settings → Deploy** 中找到 **Custom Start Command** 并填入上述命令

### 4. 环境变量
在项目里点击 **Variables**，添加：

| 变量名 | 值 | 必填 |
|--------|-----|------|
| `STRIPE_SECRET_KEY` | 你的 Stripe 密钥 `sk_test_...` 或 `sk_live_...` | ✅ |
| `FRONTEND_URL` | 你的 Netlify 前端地址，如 `https://xxx.netlify.app` | ✅ |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe 公钥 `pk_test_...` 或 `pk_live_...` | 可选 |
| `STRIPE_WEBHOOK_SECRET` | Webhook 密钥（需配置 Webhook 时填写） | 可选 |
| `SMTP_HOST` | SMTP 主机（订单邮件） | 可选 |
| `SMTP_PORT` | 587 | 可选 |
| `SMTP_USER` | SMTP 用户名 | 可选 |
| `SMTP_PASS` | SMTP 密码 | 可选 |
| `SMTP_FROM` | 发件人邮箱 | 可选 |
| `SHOP_OWNER_EMAIL` | 通知收件邮箱 | 可选 |

### 5. 获取后端地址
1. 部署成功后，在 **Settings → Domains** 中点击 **Generate Domain**
2. 记下生成的地址，例如：`https://onesiponebrush-site-production.up.railway.app`

### 6. 配置前端（Netlify）
在 Netlify 项目的 **Site settings → Environment variables** 中添加：

- `VITE_CHECKOUT_API_URL` = 上一步的后端地址（如 `https://xxx.up.railway.app`）

然后重新部署 Netlify 前端。

---

## 方式二：Render

### 1. 准备
- 代码已在 GitHub
- 访问 [render.com](https://render.com)，用 GitHub 登录

### 2. 创建服务
1. 点击 **New** → **Web Service**
2. 连接 GitHub，选择 `onesiponebrush-site`
3. 配置如下：
   - **Name**：随意，如 `onesiponebrush-api`
   - **Runtime**：Node
   - **Build Command**：`npm install`
   - **Start Command**：`node server/index.js`
   - **Instance Type**：选 Free（免费档）

### 3. 环境变量
在 **Environment** 中点击 **Add Environment Variable**，按上表添加变量。

### 4. 获取后端地址
部署完成后，Render 会给出地址，例如：`https://onesiponebrush-api.onrender.com`

### 5. 配置前端
在 Netlify 添加 `VITE_CHECKOUT_API_URL`，指向该 Render 地址。

---

## 部署后自检

1. 访问 `https://你的后端地址/api/config`，应返回 JSON（包含 `publishableKey`）
2. 在 Netlify 前端加购物车，点击结账，应能正常跳转到 Stripe
3. 支付成功后应能跳回 Netlify 前端成功页

## 常见问题

**Q: 部署后访问 API 超时？**  
A: Render 免费实例会休眠，首次请求可能较慢，约 30 秒后会有响应。

**Q: CORS 报错？**  
A: 确保 `FRONTEND_URL` 与 Netlify 实际域名一致，不要有多余斜杠。
