# 🪙 دليل إعداد موقع Saudi Gold مع Neon

---

## 📋 المتطلبات

1. **حساب GitHub** - https://github.com
2. **حساب Vercel** - https://vercel.com
3. **حساب Neon** - https://neon.tech (مجاني)
4. **حساب cron-job.org** - https://cron-job.org (مجاني)

---

## 📦 الخطوة 1: رفع الملفات على GitHub

```
1. فك ضغط saudi-gold-final.zip
2. اذهب إلى github.com/new
3. أنشئ repository اسمه "saudi-gold"
4. ارفع جميع الملفات
5. اضغط "Commit changes"
```

---

## 🐘 الخطوة 2: إنشاء قاعدة بيانات Neon

### 2.1 إنشاء حساب

```
1. اذهب إلى https://neon.tech
2. اضغط "Sign Up"
3. سجّل بـ GitHub أو Google
```

### 2.2 إنشاء Project

```
1. اضغط "Create Project"
2. أدخل:
   - Project name: saudi-gold
   - Region: Frankfurt (أو الأقرب)
3. اضغط "Create Project"
```

### 2.3 نسخ Connection String (مهم!)

```
1. بعد الإنشاء، ابحث عن "Connection string"
2. اضغط أيقونة النسخ 📋
3. ستحصل على رابط مثل:

postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require

⚠️ احفظه! ستحتاجه لاحقاً
```

---

## 🔺 الخطوة 3: إنشاء مشروع Vercel

### 3.1 Import

```
1. vercel.com → Add New → Project
2. اختر "saudi-gold"
3. Import
```

### 3.2 Environment Variables

```
أضف هذه المتغيرات:

┌─────────────────┬──────────────────────────────────────────┐
│ METAL_API_KEY   │ your_metalpriceapi_key_here              │
│ CRON_SECRET     │ change_me_to_a_random_secret             │
│ DATABASE_URL    │ postgresql://... (من Neon)               │
└─────────────────┴──────────────────────────────────────────┘
```

### 3.3 Deploy

```
اضغط Deploy وانتظر 2-3 دقائق
انسخ رابط الموقع
```

---

## ⏰ الخطوة 4: إعداد Cron (cron-job.org)

```
1. cron-job.org → سجّل حساب
2. CREATE CRONJOB
3. أدخل:
   - Title: Saudi Gold
   - URL: https://موقعك.vercel.app/api/cron/refresh-prices?secret=YOUR_CRON_SECRET
   - Schedule: Every hour
4. CREATE
5. Test run
```

---

## 🧪 الخطوة 5: تعبئة قاعدة البيانات

```
افتح في المتصفح:
https://موقعك.vercel.app/api/cron/refresh-prices?secret=YOUR_CRON_SECRET

إذا ظهر {"success":true} = ✅ تم!
```

---

## ✅ التحقق

```
1. افتح موقعك → الأسعار تظهر
2. افتح /api/prices → "source": "neon"
```

---

## 🔧 حل المشاكل

| المشكلة | الحل |
|---------|------|
| "relation does not exist" | شغّل الـ cron مرة لإنشاء الجدول |
| "connection refused" | تأكد من DATABASE_URL صحيح |
| "الأسعار غير متوفرة" | شغّل الـ cron لتعبئة البيانات |

---

## 🎉 النتيجة

✅ موقع سريع
✅ Neon مجاني (0.5GB)
✅ تحديث كل ساعة
✅ 720 طلب/شهر فقط
