import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';  // ← أضف هذا السطر
export const revalidate = 60;

// ... باقي الكود كما هو
```

**3. أنشئ مجلد `public/` فارغ** (أضف ملف فارغ اسمه `.gitkeep` داخله)

**4. اضغط Commit**

**5. Vercel سيعمل Redeploy تلقائياً**

---

### الطريقة 2: إعادة رفع الملفات الجديدة

1. احذف الملفات القديمة من GitHub
2. ارفع الملفات من الـ zip الجديد

---

## ⚠️ بعد نجاح الـ Deploy:

**شغّل هذا الرابط لإنشاء الجدول وتعبئة البيانات:**
```
https://saudi-gold.vercel.app/api/cron/refresh-prices?secret=0161348527