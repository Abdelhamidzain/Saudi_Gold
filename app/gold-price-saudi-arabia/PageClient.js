'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toAr, fmt, KARATS } from '../lib/gold';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import { GoldCalculator } from '../components/Calculators';
import FAQ from '../components/FAQ';
import Disclaimer from '../components/Disclaimer';
import InternalLinks from '../components/InternalLinks';

const pageFAQ = [
  {
    question: 'كم سعر جرام الذهب في السعودية اليوم؟',
    answer: 'يختلف سعر جرام الذهب في السعودية يوميًا حسب سعر الأونصة عالميًا وسعر صرف الدولار. السعر الظاهر أعلى الصفحة يُحدَّث تلقائيًا بالريال السعودي لكل العيارات الأكثر تداولًا.',
  },
  {
    question: 'ما الفرق بين عيار 24 وعيار 21؟',
    answer: 'عيار 24 هو الذهب الخالص بنقاوة 99.9% ويُستخدم في السبائك والاستثمار. عيار 21 يحتوي على 87.5% ذهب و12.5% معادن أخرى، وهو الأكثر شيوعًا في المجوهرات السعودية لمتانته وسعره الأقل.',
  },
  {
    question: 'هل أسعار الذهب في السعودية تشمل المصنعية؟',
    answer: 'أسعار جرام الذهب المعلنة في الأسواق هي سعر الذهب الخام فقط، ولا تشمل المصنعية. عند شراء المشغولات الذهبية يُضاف للسعر تكلفة المصنعية وضريبة القيمة المضافة على الجزء المضاف.',
  },
  {
    question: 'لماذا يختلف سعر الذهب من محل لآخر؟',
    answer: 'سعر جرام الذهب الخام موحد لأنه يتبع السعر العالمي، لكن الفروقات بين المحلات تظهر في قيمة المصنعية وهامش الربح وجودة التصميم والعلامة التجارية للقطعة.',
  },
  {
    question: 'هل يتم تحديث أسعار الذهب يوميًا؟',
    answer: 'نعم، تُحدَّث أسعار الذهب في السعودية على مدار اليوم بناءً على حركة الأونصة العالمية وسعر صرف الدولار مقابل الريال السعودي. صفحتنا تعرض آخر تحديث للسعر مباشرة.',
  },
  {
    question: 'كيف أحسب قيمة الذهب بالريال السعودي؟',
    answer: 'لحساب قيمة قطعة ذهب اضرب وزنها بالجرام في سعر جرام العيار المناسب. تجد في هذه الصفحة حاسبة ذهب جاهزة تختار فيها العيار وتُدخل الوزن لتحصل على القيمة التقريبية بالريال السعودي.',
  },
];

const links = [
  { href: '/', label: 'سعر الذهب اليوم', icon: '🪙' },
  { href: '/karat-24', label: 'سعر الذهب عيار 24', icon: '💎' },
  { href: '/karat-22', label: 'سعر الذهب عيار 22', icon: '✨' },
  { href: '/karat-21', label: 'سعر الذهب عيار 21', icon: '🏆' },
  { href: '/karat-18', label: 'سعر الذهب عيار 18', icon: '💍' },
  { href: '/gold-bars', label: 'سبائك الذهب', icon: '🟨' },
  { href: '/calculator', label: 'حاسبة الذهب', icon: '🧮' },
  { href: '/ounce', label: 'سعر أونصة الذهب', icon: '⚖️' },
];

const karatCards = [
  { k: 24, path: '/karat-24', desc: 'الأنقى — مناسب للسبائك والاستثمار', highlight: false },
  { k: 22, path: '/karat-22', desc: 'نقاوة 91.6% — شائع في الخليج والهند', highlight: false },
  { k: 21, path: '/karat-21', desc: 'الأكثر شيوعًا في السعودية', highlight: true },
  { k: 18, path: '/karat-18', desc: 'للمجوهرات الفاخرة والمرصعة', highlight: false },
];

const tableRows = [
  { k: 24, note: 'الذهب الخالص — للسبائك والاستثمار' },
  { k: 22, note: 'يستخدم في بعض المجوهرات وعملات الذهب' },
  { k: 21, note: 'الأكثر تداولًا في الأسواق السعودية' },
  { k: 18, note: 'للمجوهرات الفاخرة وقطع الأحجار الكريمة' },
  { k: 14, note: 'للمجوهرات اليومية الأكثر متانة' },
];

const FALLBACK_PRICES = {
  14: { gram: 0, ounce: 0, kilo: 0 },
  18: { gram: 0, ounce: 0, kilo: 0 },
  21: { gram: 0, ounce: 0, kilo: 0 },
  22: { gram: 0, ounce: 0, kilo: 0 },
  24: { gram: 0, ounce: 0, kilo: 0 },
};

function formatRiyadh(iso) {
  if (!iso) return 'جاري التحديث...';
  try {
    return new Date(iso).toLocaleString('ar-SA', {
      timeZone: 'Asia/Riyadh',
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'long',
    });
  } catch {
    return 'جاري التحديث...';
  }
}

export default function PageClient() {
  // Gate: render NOTHING in the SSR/initial HTML pass — only render
  // after React mounts on the client. This keeps View Source limited to
  // the H1 + intro paragraph from the parent server component.
  const [mounted, setMounted] = useState(false);
  const [prices, setPrices] = useState(FALLBACK_PRICES);
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    setMounted(true);

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/live-gold');
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled || !data?.success || !data?.prices) return;
        setPrices(data.prices);
        setUpdatedAt(data.updatedAt || null);
      } catch {
        /* silent */
      }
    })();

    return () => { cancelled = true; };
  }, []);

  if (!mounted) return null;

  const price21 = prices[21];
  const formattedTime = formatRiyadh(updatedAt);

  return (
    <>
      <Header />

      <div className="container">
        <Breadcrumb items={[
          { name: 'الرئيسية', href: '/' },
          { name: 'سعر الذهب في السعودية اليوم' },
        ]} />
      </div>

      <section className="hero">
        <div className="container">
          <h1>سعر الذهب في السعودية اليوم</h1>

          <div className="badge">
            <span className="live-dot"></span>
            <span>سعر محدث لحظياً</span>
          </div>

          <p className="hero-subtitle">
            تابع سعر الذهب في السعودية اليوم بالريال السعودي، مع تحديثات واضحة لأسعار الذهب
            حسب العيار، مثل عيار 24 وعيار 22 وعيار 21 وعيار 18. تساعدك هذه الصفحة على معرفة
            سعر جرام الذهب، مقارنة الفروقات بين العيارات، وفهم العوامل التي تؤثر على حركة
            الذهب في السوق السعودي قبل الشراء أو البيع.
          </p>

          <div className="main-price-box">
            <div className="main-price-label">سعر جرام الذهب عيار ٢١</div>
            <div className="main-price-value">
              <span>{fmt(price21?.gram)}</span>
              <span className="main-price-currency">ر.س</span>
            </div>
            <div className="last-update">آخر تحديث: {formattedTime}</div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#price-table" className="price-card" style={{ padding: '10px 18px', textDecoration: 'none' }}>
              📊 جدول الأسعار
            </Link>
            <Link href="#calculator" className="price-card" style={{ padding: '10px 18px', textDecoration: 'none' }}>
              🧮 حاسبة الذهب
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">أسعار الذهب في السعودية حسب العيار</h2>
          <div className="price-cards">
            {karatCards.map(({ k, path, desc, highlight }) => (
              <Link
                key={k}
                href={path}
                className={`price-card ${highlight ? 'highlight' : ''}`}
                prefetch={false}
              >
                <div className="price-card-karat" aria-hidden="true">{toAr(k)}</div>
                <h3 className="price-card-label">سعر جرام عيار {toAr(k)}</h3>
                <div className="price-card-value">{fmt(prices[k]?.gram)}</div>
                <div className="price-card-unit">ر.س / جرام</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--txt3, #B0B0B8)', marginTop: '8px' }}>{desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="price-table" className="section">
        <div className="container">
          <div className="table-section">
            <div className="table-header">
              <h2>📊 جدول أسعار الذهب اليوم في السعودية بالريال السعودي</h2>
            </div>
            <div className="table-wrapper">
              <table className="data-table price-table">
                <thead>
                  <tr>
                    <th>العيار</th>
                    <th>سعر الجرام (ر.س)</th>
                    <th>سعر الأونصة (ر.س)</th>
                    <th>سعر الكيلو (ر.س)</th>
                    <th>ملاحظات</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map(({ k, note }) => (
                    <tr key={k}>
                      <td><span className="karat-badge">{toAr(k)}K</span> عيار {toAr(k)}</td>
                      <td>{fmt(prices[k]?.gram)}</td>
                      <td>{fmt(prices[k]?.ounce)}</td>
                      <td>{fmt(prices[k]?.kilo)}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--txt2, #E0E0E8)' }}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--txt3, #B0B0B8)', textAlign: 'center', marginTop: '12px' }}>
              الأسعار بالريال السعودي ولا تشمل المصنعية وضريبة القيمة المضافة.
            </p>
          </div>
        </div>
      </section>

      <section id="calculator" className="section">
        <div className="container">
          <h2 className="section-title">🧮 حاسبة الذهب في السعودية</h2>
          <p style={{ textAlign: 'center', color: 'var(--txt2, #E0E0E8)', maxWidth: '600px', margin: '0 auto 24px' }}>
            احسب قيمة الذهب بالريال السعودي عبر إدخال الوزن بالجرام واختيار العيار المناسب.
            النتيجة تعتمد على آخر سعر جرام معلن أعلى الصفحة.
          </p>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <GoldCalculator prices={prices} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-section">
            <h2>كيف يتم تحديد سعر الذهب في السعودية؟</h2>
            <p>
              أسعار الذهب في السعودية تتأثر بعدة عوامل، منها سعر الأونصة عالميًا، سعر صرف
              الدولار مقابل الريال السعودي، حركة الطلب المحلي، وتكاليف المصنعية والضريبة
              عند الشراء. لذلك قد يختلف السعر النهائي من محل إلى آخر، خصوصًا عند شراء
              السبائك أو المشغولات الذهبية. السعر المعروض على هذه الصفحة يعكس سعر الجرام
              الخام محسوبًا من الأونصة العالمية ومحوّلًا إلى الريال السعودي.
            </p>

            <h2>الفرق بين عيار 24 وعيار 21 وعيار 18</h2>
            <p>
              الذهب لا يُباع دائمًا بنقاوته الكاملة، فهو يُخلط أحيانًا بمعادن أخرى لمنحه
              المتانة الكافية للاستخدام في المجوهرات. كل عيار يدل على نسبة الذهب الخالص
              داخل القطعة.
            </p>
            <ul>
              <li><strong>عيار 24:</strong> الذهب الخالص بنقاوة 99.9%، لين جدًا، يُستخدم غالبًا في السبائك والاستثمار.</li>
              <li><strong>عيار 22:</strong> نقاوة 91.6%، شائع في عملات الذهب وبعض المجوهرات.</li>
              <li><strong>عيار 21:</strong> نقاوة 87.5%، وهو الأكثر شيوعًا في السوق السعودي بسبب توازنه بين السعر والمتانة.</li>
              <li><strong>عيار 18:</strong> نقاوة 75%، مناسب للمجوهرات الفاخرة والقطع المرصعة بالأحجار الكريمة.</li>
            </ul>

            <h2>هل سعر الذهب يشمل المصنعية؟</h2>
            <p>
              لا. أسعار الذهب المعلنة على هذه الصفحة هي أسعار جرام الذهب الخام بحسب
              البورصة العالمية بعد التحويل للريال السعودي. عند شراء مشغولات ذهبية يُضاف
              إلى السعر تكلفة المصنعية التي تتراوح غالبًا بين 15 و50 ريالًا للجرام حسب
              التصميم، إضافة إلى ضريبة القيمة المضافة على الجزء المضاف.
            </p>

            <h2>متى يكون شراء الذهب أفضل؟</h2>
            <p>
              لا يوجد توقيت سحري لشراء الذهب، لكن غالبًا يفضّل المشترون متابعة الأسعار
              لفترة قبل الشراء وانتظار التراجعات النسبية في السعر. كذلك يفضّل شراء الذهب
              للأغراض الاستثمارية على شكل سبائك أو عيار 24 لتقليل تأثير المصنعية على
              القيمة عند البيع لاحقًا.
            </p>

            <h2>الفرق بين السبائك والمشغولات الذهبية</h2>
            <p>
              السبائك هي قوالب ذهب خالص بعيار 24 غالبًا، تأتي بأوزان معيارية مثل 10 و50
              و100 جرام، ولا تحمل مصنعية تُذكر فيكون سعرها قريبًا من سعر الذهب العالمي.
              أما المشغولات الذهبية فهي مجوهرات بأشكال متعددة وعيارات مختلفة، وتشمل تكلفة
              المصنعية إضافة لقيمة الذهب نفسه، ما يجعلها أقل ملاءمة من السبائك للاستثمار
              البحت لكنها مرغوبة للاستخدام والاقتناء.
            </p>

            <h2>نصائح قبل شراء أو بيع الذهب في السعودية</h2>
            <ul>
              <li>اطلب فاتورة رسمية مكتوبة بها العيار والوزن والمصنعية وضريبة القيمة المضافة بوضوح.</li>
              <li>قارن المصنعية بين أكثر من محل قبل الشراء — فروقات بسيطة في الجرام تتضخم مع وزن القطعة.</li>
              <li>تأكد من وجود الختم الرسمي الذي يوضح العيار (مثل 21K أو 875) على القطعة.</li>
              <li>عند البيع، السعر عادة يكون أقل من سعر الشراء بـ 5% إلى 15% حسب حالة القطعة وسياسة المحل.</li>
              <li>لأغراض الاستثمار، فضّل السبائك أو عيار 24 لأن قيمتها أقرب لسعر الذهب العالمي.</li>
            </ul>

            <InternalLinks links={links} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FAQ items={pageFAQ} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Disclaimer />
        </div>
      </section>

      <Footer />
    </>
  );
}
