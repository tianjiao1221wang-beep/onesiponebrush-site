# Mailchimp 与联系表单配置

本说明帮助你配置**邮件订阅（Newsletter）**和**联系表单**。

## 一、邮件订阅（Mailchimp）

订阅表单会将被提交的邮箱添加到你的 Mailchimp 受众中。

### 1. 获取 Mailchimp API Key

1. 登录 [Mailchimp](https://mailchimp.com)
2. 右上角头像 → **Account & Billing** → **Extras** → **API keys**
3. 新建或复制已有的 API Key，格式类似：`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us11`（末尾 `-us11` 为数据中心）

### 2. 获取 Audience / List ID

1. 左侧导航 → **Audience** → **All contacts**
2. 点击 **Audience dashboard** 或 **Settings**
3. 在 **Audience name and defaults** 中找到 **Audience ID**（一串字母数字）

### 3. 配置环境变量

在服务端（如 Railway）的 `.env` 中添加：

```
MAILCHIMP_API_KEY=你的完整API密钥，例如xxxxxxxx-us11
MAILCHIMP_LIST_ID=你的Audience ID
```

本地开发时，在项目根目录的 `.env` 中同样添加上述变量。

## 二、联系表单（Resend）

联系表单会将用户提交的留言通过 [Resend](https://resend.com) 发送到 `SHOP_OWNER_EMAIL`。

### 1. 注册 Resend

1. 打开 [resend.com](https://resend.com) 注册账号
2. 进入 **API Keys** 创建 API Key，复制（格式 `re_xxxxxx`）
3. 在 Resend 后台 **Domains** 中**添加并验证**你的域名（如 `onesiponebrush.com`）

### 2. 配置环境变量

在 Railway 的 Variables 中添加：

```
RESEND_API_KEY=re_你的API密钥
RESEND_FROM="One Sip One Brush <noreply@你的域名.com>"
SHOP_OWNER_EMAIL=sipbrush@gmail.com
```

`RESEND_FROM` 必须使用**已验证域名**下的邮箱。未验证域名前，可暂时使用 `onboarding@resend.dev` 做测试（可能进垃圾箱）。

## 三、前端配置

订阅和联系表单通过后端 API 工作，前端需知道后端地址。

在 Netlify / Vercel 等前端部署平台的环境变量中设置：

```
VITE_CHECKOUT_API_URL=https://你的后端地址
```

例如使用 Railway 部署后端，则填入类似 `https://xxx.up.railway.app` 的地址。

本地开发时，若未设置 `VITE_CHECKOUT_API_URL`，前端会自动使用 `http://localhost:4242`（确保 `npm run dev:server` 已启动）。

## 四、测试

1. 启动后端：`npm run dev:server`
2. 启动前端：`npm run dev`
3. 在 Footer 或 Contact 页面提交订阅邮箱，检查 Mailchimp 受众中是否出现新联系人
4. 提交联系表单，检查 `SHOP_OWNER_EMAIL` 是否收到邮件
