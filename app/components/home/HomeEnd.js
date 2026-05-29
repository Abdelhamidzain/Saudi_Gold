'use client';

import Link from 'next/link';
import FAQ from '../FAQ';
import Disclaimer from '../Disclaimer';
import Footer from '../Footer';

const homeFAQ = [
  { question: 'كم سعر الذهب اليوم في السعودية بالريال السعودي؟', answer: 'يتحدد وفقاً لتسعيرة الأونصة عالمياً مع احتساب صرف الدولار مقابل الريال. راجع الجدول أعلاه لمعرفة القيمة الآنية لكل درجات النقاء.' },
  { question: 'ما الفرق بين الثمن الصافي والثمن بالمصنعية؟', answer: 'الخام يعني تكلفة الوحدة مجرّدة من إضافات. المتاجر ترفع الرقم بأجور التصنيع (15-50 ريال للغرام) وضريبة 15%. القوالب الاستثمارية 24 قيراط معفاة كلياً.' },
  { question: 'أي عيار أنسب للاقتناء؟', answer: 'للحُلي والمناسبات: درجة 21 تجمع النقاء (87.5%) والمتانة. للتحوّط والادّخار: صبّات 24 تُباع بهامش ضئيل فوق البورصة.' },
  { question: 'كيف أحسب تكلفة قطعة مع أتعاب الصائغ؟', answer: 'المعادلة: (الوزن × ثمن الوحدة) + (الوزن × أتعاب الحرفة) + 15% ضريبة. مثال: خاتم 5 غرام بأتعاب 30 ريال. جرّب أداتنا التفاعلية للنتيجة الفورية.' },
  { question: 'متى تجب الزكاة الشرعية؟', answer: 'عند بلوغ النصاب (85 غرام خالص) ومرور حول هجري كامل. النسبة 2.5% من القيمة السوقية وقت الإخراج.' },
  { question: 'أين أرخص الوجهات للتسوّق؟', answer: 'الأحياء التجارية العريقة تمنح هوامش تنافسية: الثميري والبطحاء بالعاصمة، حراء واليمامة بالميناء الغربي، العتيبية قرب الحرم. فاوض دائماً وقارن عرضَين على الأقل.' },
  { question: 'هل يختلف الثمن بين المناطق والمحافظات؟', answer: 'القيمة الأساسية موحّدة لارتباطها ببورصات المعادن الدولية. الاختلاف ينحصر في أتعاب الصانع وهامش ربحه. تصفّح صفحات المحافظات لمعرفة أقرب الوجهات.' },
];

export default function HomeEnd() {
  return (
    <>
      {/* ═══ SEO Content Block 4 ═══ */}
      <section className="section">
        <div className="container">
          <div className="info-section">
            <h2>مقارنة العيارات — أيهم يلائم احتياجك؟</h2>
            <p>
              <Link href="/karat-24" className="text-gold">عيار 24</Link> (99.9% نقاوة) للسبائك والجنيهات حصراً — ليّن لا يصلح للحُلي. <Link href="/karat-21" className="text-gold">عيار 21</Link> (87.5% نقاء) الأكثر رواجاً محلياً للشبكات والأطقم. <Link href="/karat-22" className="text-gold">عيار 22</Link> (91.6%) شائع في المشغولات التراثية. <Link href="/karat-18" className="text-gold">عيار 18</Link> (75%) المفضّل لدى كارتييه وبولغاري لترصيع الألماس. قارن الثمن باستخدام <Link href="/calculator" className="text-gold">أداة الحساب</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Chart + Why Us ═══ */}
      <section className="section">
        <div className="container">
          <div className="info-section">
            <h2>الرسم البياني والتحليل الفني</h2>
            <p>
              لمتابعة سعر الذهب في السعودية اليوم عبر الرسوم البيانية — تتبّع حركة المعدن الثمين يكشف أنماط السوق المحلي. والبيانات والتحليلات تشير لاستمرار الاتجاه الصاعد مع تزايد الطلب المركزي الآسيوي. احصل على الشارت التفصيلي من صفحة <Link href="/history" className="text-gold">التاريخ والتحليل الفني</Link>. نوفر أيضاً: حاسبة تفاعلية بالمصنعية، أداة الزكاة الشرعية، تغطية حسب المدينة، وتسعيرة المستعمل يومياً — مجاناً بدون تسجيل.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Blog CTA ═══ */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">مقالات ودليل المشتري</h2>
          <div className="price-cards">
            <Link href="/blog/gold-buying-guide-saudi" className="price-card">
              <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>📖</div>
              <h3 className="price-card-label">دليل الشراء للمبتدئين</h3>
              <div className="price-card-unit">نصائح عملية وتطبيقية</div>
            </Link>
            <Link href="/blog/difference-gold-karats" className="price-card">
              <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>💎</div>
              <h3 className="price-card-label">مقارنة العيارات</h3>
              <div className="price-card-unit">24 vs 22 vs 21 vs 18</div>
            </Link>
            <Link href="/blog/gold-zakat-guide" className="price-card">
              <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>🕌</div>
              <h3 className="price-card-label">دليل الزكاة الشرعية</h3>
              <div className="price-card-unit">حساب النصاب مع أمثلة</div>
            </Link>
            <Link href="/blog/best-time-buy-gold" className="price-card">
              <div className="price-card-karat" style={{ fontSize: '1.5rem' }}>⏰</div>
              <h3 className="price-card-label">أفضل توقيت للشراء</h3>
              <div className="price-card-unit">تحليل وتوقعات</div>
            </Link>
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link href="/blog" className="btn btn-outline">
              عرض جميع المقالات ←
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">الأسئلة الشائعة</h2>
          <FAQ items={homeFAQ} />
        </div>
      </section>

      {/* ═══ Disclaimer ═══ */}
      <section className="section">
        <div className="container">
          <Disclaimer />
        </div>
      </section>

      <Footer />
    </>
  );
}
