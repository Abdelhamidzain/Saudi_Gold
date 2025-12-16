# 🪙 Saudi Gold - Next.js + Vercel

موقع أسعار الذهب في السعودية مع تحديث تلقائي.

## ⚠️ ملاحظة مهمة

Vercel Hobby Plan = Cron مرة واحدة يومياً فقط!
لذلك نستخدم **cron-job.org** (مجاني) للتحديث كل ساعة.

## 🏗️ Architecture

```
cron-job.org (كل ساعة - مجاني)
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
│   │   ├── prices/route.js         
│   │   └── cron/refresh-prices/route.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js                     
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
CRON_SECRET=your-random-secret-here
```

### 3. Deploy
```bash
npm install
vercel
```

### 4. Setup External Cron (FREE)

1. اذهب إلى https://cron-job.org
2. سجّل حساب مجاني
3. أضف Cron Job جديد:
   - URL: `https://YOUR-SITE.vercel.app/api/cron/refresh-prices?secret=YOUR_SECRET`
   - Schedule: Every 1 hour
   - Method: GET

### 5. Seed Cache (أول مرة)
```bash
CRON_SECRET=xxx node scripts/seed-cache.js https://your-site.vercel.app
```

## ✅ Features

- ⚡ Ultra fast (cached API)
- 🔄 Auto-update every hour
- 📱 Mobile responsive
- 🧮 Gold & Zakat calculators
- 📊 Price chart

## 💡 External Cron Options (Free)

| Service | Free Tier |
|---------|-----------|
| cron-job.org | Unlimited |
| Upstash QStash | 500/day |
| EasyCron | 200/month |
