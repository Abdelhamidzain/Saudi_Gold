# 🪙 Saudi Gold - Next.js + Vercel

موقع أسعار الذهب في السعودية مع Cron Job للتحديث التلقائي.

## 🏗️ Architecture

```
Vercel Cron (كل ساعة)
        ↓
/api/cron/refresh-prices → metalpriceapi.com
        ↓
    Vercel KV (cache)
        ↓
/api/prices → يقرأ من cache فقط ✅
        ↓
    الزوار (غير محدود!)
```

## 📁 Files

```
saudi-gold-final/
├── app/
│   ├── api/
│   │   ├── prices/route.js         ← Public API
│   │   └── cron/refresh-prices/route.js ← Cron Job
│   ├── globals.css
│   ├── layout.js
│   └── page.js                     ← Main Page
├── scripts/
│   └── seed-cache.js
├── vercel.json
├── package.json
└── next.config.js
```

## 🚀 Setup

### 1. Create Vercel KV
- Vercel Dashboard → Storage → Create → KV
- Link to project

### 2. Environment Variables
```
METAL_API_KEY=484e10b2ec808863d1c692d2ea2eb921
CRON_SECRET=<random-string>
```

Generate secret:
```bash
openssl rand -hex 32
```

### 3. Deploy
```bash
npm install
vercel
```

### 4. Seed Cache
```bash
CRON_SECRET=xxx node scripts/seed-cache.js https://your-site.vercel.app
```

## ✅ Features

- ⚡ Ultra fast (cached API)
- 🔄 Auto-update every hour
- 📱 Mobile responsive
- 🧮 Gold calculator
- 🕌 Zakat calculator
- 📊 Price chart
- 🏪 Markets directory

## 📊 API Budget

- 720 requests/month (every 60 min)
- 28% safety buffer
