# 🪙 Saudi Gold - Next.js + Neon

موقع أسعار الذهب في السعودية مع قاعدة بيانات Neon.

## 🏗️ Architecture

```
cron-job.org (كل ساعة)
        ↓
/api/cron/refresh-prices → metalpriceapi.com
        ↓
    Neon PostgreSQL
        ↓
/api/prices → يقرأ من Neon ✅
        ↓
    الزوار
```

## 🚀 Quick Setup

1. **GitHub**: ارفع الملفات
2. **Neon**: أنشئ project وانسخ DATABASE_URL
3. **Vercel**: Deploy + أضف Environment Variables
4. **cron-job.org**: أنشئ cron كل ساعة
5. **تعبئة**: زر `/api/cron/refresh-prices?secret=xxx`

## Environment Variables

```
METAL_API_KEY=your_metalpriceapi_key_here
CRON_SECRET=change_me_to_a_random_secret
DATABASE_URL=postgresql://...neon.tech/neondb?sslmode=require
```

## 📖 الدليل الكامل

راجع ملف `SETUP-GUIDE.md`
