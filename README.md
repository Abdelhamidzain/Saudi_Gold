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
METAL_API_KEY=484e10b2ec808863d1c692d2ea2eb921
CRON_SECRET=my-secret-123
DATABASE_URL=postgresql://...neon.tech/neondb?sslmode=require
```

## 📖 الدليل الكامل

راجع ملف `SETUP-GUIDE.md`
