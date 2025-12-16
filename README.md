# 🪙 Saudi Gold - Vercel Edition

نسخة محسنة للعمل على Vercel

## 📁 الملفات

```
saudi-gold-vercel/
├── index.html      ← الصفحة الرئيسية
├── blog.html       ← المدونة (ثابتة)
├── api/
│   └── prices.js   ← Serverless API
├── vercel.json     ← إعدادات Vercel
├── robots.txt
└── sitemap.xml
```

## 🚀 طريقة الرفع

### Option 1: GitHub + Vercel
1. ارفع الملفات على GitHub
2. اربط الـ repo بـ Vercel
3. Vercel سيعمل deploy تلقائي

### Option 2: Vercel CLI
```bash
npm i -g vercel
cd saudi-gold-vercel
vercel
```

## ⚡ API

الـ API يعمل على `/api/prices` (Vercel Serverless Function)

## 📝 المدونة

المدونة حالياً **ثابتة** (HTML).

لإضافة مقالات جديدة:
1. عدّل ملف `blog.html`
2. أضف المقال الجديد

### للمستقبل: CMS
إذا تريد CMS ديناميكي:
- [Contentful](https://contentful.com) - مجاني
- [Sanity](https://sanity.io) - مجاني
- [Notion as CMS](https://notion.so) - مجاني

## ✅ المميزات

- ⚡ فائق السرعة (Static HTML)
- 🌐 يعمل على Vercel
- 📱 متجاوب مع الموبايل
- 🔄 API للأسعار الحية
- 🎨 أرقام عربية (٠١٢٣٤٥٦٧٨٩)
