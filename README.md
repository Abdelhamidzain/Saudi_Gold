# 🪙 Saudi Gold - Next.js + Vercel (Cron Cached)

## 🏗️ Architecture Summary

```
┌─────────────────────────────────────────────────────────┐
│                 VERCEL CRON                             │
│              Every 60 min = 720 req/month               │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│         /api/cron/refresh-prices                        │
│  • Validates CRON_SECRET                                │
│  • Fetches metalpriceapi.com (1 request)               │
│  • Saves to Vercel KV                                  │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│              VERCEL KV (Redis)                          │
│  Key: "gold_prices"                                     │
│  TTL: 2 hours                                          │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│              /api/prices                                │
│  • Reads from KV ONLY ✅                               │
│  • NEVER calls external API ❌                         │
│  • CDN cached 60 seconds                               │
└─────────────────────────────────────────────────────────┘
                  ▲
                  │
        ┌────────┴────────┐
        │    VISITORS     │
        │  (Unlimited!)   │
        └─────────────────┘
```

---

## 📊 Request Budget

| Schedule | Requests/Month | Status |
|----------|---------------|--------|
| Every 60 min | **720** | ✅ Safe (28% buffer) |
| Every 45 min | 960 | ⚠️ Tight |
| Every 30 min | 1440 | ❌ Over limit |

**Selected: Every 60 minutes** (0 * * * *)

---

## 🚀 Setup Instructions

### Step 1: Create Vercel KV

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Storage** → **Create Database**
4. Select **KV** → Create
5. Link it to your project

### Step 2: Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
METAL_API_KEY=484e10b2ec808863d1c692d2ea2eb921
CRON_SECRET=<generate-random-string>
```

To generate CRON_SECRET:
```bash
openssl rand -hex 32
```

### Step 3: Deploy

```bash
# Clone and deploy
git clone <your-repo>
cd saudi-gold-nextjs
npm install
vercel
```

### Step 4: Seed Cache (First Time)

After deployment, seed the cache:

```bash
CRON_SECRET=your-secret node scripts/seed-cache.js https://your-site.vercel.app
```

Or manually visit:
```
https://your-site.vercel.app/api/cron/refresh-prices?secret=YOUR_CRON_SECRET
```

---

## 📁 File Structure

```
saudi-gold-nextjs/
├── app/
│   ├── api/
│   │   ├── prices/
│   │   │   └── route.js      # Public API (reads cache only)
│   │   └── cron/
│   │       └── refresh-prices/
│   │           └── route.js  # Cron endpoint (fetches external API)
│   ├── components/
│   │   └── GoldPricesClient.js
│   ├── layout.js
│   └── page.js
├── scripts/
│   └── seed-cache.js
├── vercel.json               # Cron configuration
├── package.json
├── next.config.js
└── .env.example
```

---

## 🔧 Vercel Cron Setup

The `vercel.json` configures the cron job:

```json
{
  "crons": [
    {
      "path": "/api/cron/refresh-prices?secret=${CRON_SECRET}",
      "schedule": "0 * * * *"
    }
  ]
}
```

**Schedule:** `0 * * * *` = Every hour at minute 0

---

## ✅ Verification Checklist

### 1. Verify Cron is Running
- Go to Vercel Dashboard → Your Project → Logs
- Filter by `/api/cron/refresh-prices`
- Should see hourly calls

### 2. Verify Cache is Working
```bash
curl https://your-site.vercel.app/api/prices
```
Response should include:
```json
{
  "success": true,
  "source": "cache",
  "rates": { "SAR": 9874.xx, "USD": 2633.xx }
}
```

### 3. Verify No Direct API Calls
- Open browser DevTools → Network
- Visit your site
- Should see only `/api/prices` calls
- NO calls to `metalpriceapi.com`

### 4. Verify PageSpeed
- Run Lighthouse
- Should NOT show `/api/prices.php` errors
- API should respond in < 100ms (from cache)

---

## 🔐 Security

1. **CRON_SECRET**: Never expose in client-side code
2. **METAL_API_KEY**: Stored in env, never sent to browser
3. **Rate Limiting**: Cron endpoint validates secret
4. **CDN Cache**: Reduces load on API route

---

## 🧪 Local Development

1. Create `.env.local`:
```
METAL_API_KEY=your-key
CRON_SECRET=test-secret
KV_REST_API_URL=your-upstash-url
KV_REST_API_TOKEN=your-upstash-token
```

2. Run:
```bash
npm run dev
```

3. Test cron:
```bash
curl "http://localhost:3000/api/cron/refresh-prices?secret=test-secret"
```

4. Test public API:
```bash
curl http://localhost:3000/api/prices
```

---

## 📈 Performance Improvements

| Before | After |
|--------|-------|
| FCP: 3.0s | FCP: < 0.5s |
| LCP: 3.0s | LCP: < 1.0s |
| API: 780ms | API: < 50ms |
| Errors in console | No errors |

---

## 🆘 Troubleshooting

### "Cache miss" error
- Run seed script to initialize cache
- Check if KV is linked correctly

### Cron not running
- Check Vercel dashboard → Cron logs
- Verify CRON_SECRET is set

### 403 Forbidden
- API key may be invalid
- Check metalpriceapi.com dashboard

---

## 📝 Notes

- **Cron runs on Pro plan** (Hobby has limited cron)
- **KV is free** up to certain limits
- **Edge Runtime** for fastest response times
