'use client';

import { useEffect } from 'react';

// هذا المكون لا يعرض أي شيء مرئي
// وظيفته فقط تحديث الصفحة عند تغير الأسعار
export default function LivePrices({ initialPrices }) {
  useEffect(() => {
    // تحديث كل 5 دقائق
    const interval = setInterval(() => {
      // إعادة تحميل الصفحة للحصول على أسعار جديدة من ISR
      if (document.visibilityState === 'visible') {
        window.location.reload();
      }
    }, 300000); // 5 دقائق

    return () => clearInterval(interval);
  }, []);

  // لا يعرض شيء - التحديث يتم من خلال ISR
  return null;
}
