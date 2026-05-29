'use client';

import Link from 'next/link';

/*
 * HomeSeoDetailsClient — long-form, deep explanatory/educational prose.
 *
 * This component is loaded with dynamic(..., { ssr: false }) in page.js, so it
 * is NOT part of the initial server HTML and ships in a separate async client
 * chunk fetched after hydration. It carries supplementary depth only — every
 * PRIMARY keyword cluster already lives server-side in HomeKeywordIntentLayer,
 * the hero, the price table and the FAQ.
 *
 * It is placed below the fold in page.js to avoid layout shift, and is shown
 * identically to every user agent (plain CSR — no cloaking, no hidden text).
 */
export default function HomeSeoDetailsClient() {
  return (
    <>
      {/* Pricing context / gram derivation */}
      <section className="section">
        <div className="container">
          <div className="info-section">
            <h2>سعر الذهب في السعودية — كيف يُحسب وكيف تتابعه؟</h2>
            <p>
              سعر الذهب اليوم في السعودية يتحدد وفقاً لقيمة الأوقية عالمياً في
              بورصتَي لندن ونيويورك بالدولار، ثم يُحوَّل للريال بالصرف الثابت
              3.75. ما تراه في الأعلى هو ثمن الجرام النقي (سبوت) قبل إضافات
              الصائغ؛ إذ تحمّل ورش الحُلي{' '}
              <Link href="/workmanship" className="text-gold">أجور الصنعة</Link>{' '}
              وضريبة القيمة المضافة 15%، باستثناء{' '}
              <Link href="/gold-bars" className="text-gold">السبائك الاستثمارية</Link>{' '}
              التي تُباع بهامش ضئيل.
            </p>
          </div>
        </div>
      </section>

      {/* Macro factors — pure education */}
      <section className="section">
        <div className="container">
          <div className="info-section">
            <h2>لماذا تتصاعد أسعار المعدن الأصفر عالمياً؟</h2>
            <p>
              تاريخياً، عرفت الحضارات القديمة — من الفراعنة إلى ممالك بلاد
              الرافدين — قيمة هذا العنصر النادر واستخدمته عملةً ورمزاً للثروة.
              خلال القرن العشرين ربطت اتفاقية بريتون وودز الدولار بالمعيار
              الذهبي، حتى فصلهما الرئيس نيكسون عام 1971. منذ ذلك الحين أصبحت
              الأونصة أداة تحوّط مستقلة يلجأ إليها المدّخرون أثناء الأزمات
              المالية — كانهيار ليمان براذرز 2008 وجائحة كورونا 2020.
            </p>
            <p>
              حالياً، ثلاث قوى تدفع الأونصة للصعود: المشتريات الضخمة للبنوك
              المركزية الآسيوية ضمن استراتيجية تنويع الاحتياطيات السيادية بعيداً
              عن هيمنة الدولار، وارتفاع مؤشرات التضخّم العالمي الذي يُضعف القوة
              الشرائية للعملات الورقية، والتوترات الجيوسياسية المتصاعدة التي
              تزيد حالة عدم اليقين فيتحوّل المستثمرون للأصول الملموسة.
            </p>
            <p>
              نصيحة تطبيقية: لشراء{' '}
              <Link href="/karat-21" className="text-gold">مجوهرات عيار 21</Link>{' '}
              تابع المتوسط الأسبوعي واشترِ عند انخفاض 2-3%. أما{' '}
              <Link href="/gold-bars" className="text-gold">سبائك 24 قيراط للادّخار</Link>،
              فأسلوب الشراء الدوري الشهري يخفّض مخاطر التوقيت.
            </p>
          </div>
        </div>
      </section>

      {/* Used gold resale */}
      <section className="section">
        <div className="container">
          <div className="info-section">
            <h2>سعر بيع الذهب المستعمل — كم تسترد فعلاً؟</h2>
            <p>
              مَن يتابع سعر الذهب اليوم عيار 21 في السعودية يسأل: كم آخذ لو بعت
              قطعتي القديمة؟ التاجر يشتري بالقيمة الأساسية ناقص 1-5% ولا يحتسب
              أتعاب الصنعة. لذلك يفضّل المستثمرون{' '}
              <Link href="/gold-bars" className="text-gold">القوالب الاستثمارية</Link>{' '}
              — عند التصفية تسترد ثمناً قريباً جداً من البورصة. قارن عروض ثلاثة
              تجّار واحسب القيمة العادلة عبر{' '}
              <Link href="/calculator" className="text-gold">أداة الحساب</Link>{' '}
              قبل المفاوضة، وراجع تفاصيل أوفى في{' '}
              <Link href="/buy-sell" className="text-gold">صفحة البيع والشراء</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Karat comparison */}
      <section className="section">
        <div className="container">
          <div className="info-section">
            <h2>مقارنة العيارات — أيهم يلائم احتياجك؟</h2>
            <p>
              <Link href="/karat-24" className="text-gold">عيار 24</Link> (99.9%
              نقاوة) للسبائك والجنيهات حصراً — ليّن لا يصلح للحُلي.{' '}
              <Link href="/karat-21" className="text-gold">عيار 21</Link> (87.5%
              نقاء) الأكثر رواجاً محلياً للشبكات والأطقم.{' '}
              <Link href="/karat-22" className="text-gold">عيار 22</Link> (91.6%)
              شائع في المشغولات التراثية.{' '}
              <Link href="/karat-18" className="text-gold">عيار 18</Link> (75%)
              المفضّل لترصيع الألماس. قارن الثمن باستخدام{' '}
              <Link href="/calculator" className="text-gold">أداة الحساب</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Chart & why-us */}
      <section className="section">
        <div className="container">
          <div className="info-section">
            <h2>الرسم البياني والتحليل الفني</h2>
            <p>
              لمتابعة سعر الذهب اليوم في السعودية عبر الرسوم البيانية، فإن تتبّع
              حركة المعدن الثمين يكشف أنماط السوق المحلي، والبيانات تشير لاستمرار
              الاتجاه الصاعد مع تزايد الطلب المركزي الآسيوي. احصل على الشارت
              التفصيلي من صفحة{' '}
              <Link href="/history" className="text-gold">التاريخ والتحليل الفني</Link>.
              نوفّر أيضاً حاسبة تفاعلية بالمصنعية، وأداة الزكاة الشرعية، وتغطية
              حسب المدينة، وتسعيرة المستعمل يومياً — مجاناً وبدون تسجيل.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
