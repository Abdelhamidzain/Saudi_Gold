import Link from 'next/link';

/*
 * HomeSsrKeywordTextLayer — natural, SERVER-RENDERED keyword text layer.
 *
 * The only SEO-heavy server content on the homepage. Keyword phrases are woven
 * into short, readable Arabic sentences with minimal connectors; each phrase is
 * wrapped in <span className="SSR"> for a subtle visible emphasis. No chips, no
 * cards, no comma walls, no hidden text. Priority phrases appear ~twice across
 * a "today" pass and a short recap, distributed naturally.
 *
 * Server Component: no 'use client', no dynamic import.
 */

// Keyword span helper — keeps the JSX readable.
const K = ({ children }) => <span className="SSR">{children}</span>;

export default function HomeSsrKeywordTextLayer() {
  return (
    <section className="section" id="ssr-keywords">
      <div className="container">
        <div className="info-section">
          <h2>أسعار الذهب اليوم في السعودية</h2>

          {/* Pass 1 — one natural mention per priority phrase, grouped by intent */}
          <p>
            نتابع لك <K>سعر الذهب اليوم</K> و<K>اسعار الذهب</K> و<K>أسعار الذهب</K>{' '}
            لحظةً بلحظة، مع <K>سعر الذهب مباشر</K> و<K>سعر الذهب الآن</K>، حتى تعرف{' '}
            <K>الذهب اليوم</K> دون عناء.
          </p>
          <p>
            ونعرض <K>سعر الذهب اليوم في السعودية</K> و<K>اسعار الذهب اليوم في السعودية</K>،
            إلى جانب <K>اسعار الذهب في السعودية</K> و<K>أسعار الذهب في السعودية</K> و
            <K>سعر الذهب في السعودية</K> و<K>الذهب في السعودية</K> بالريال السعودي.
          </p>
          <p>
            يهمّك أيضاً <K>سعر جرام الذهب</K> و<K>سعر جرام الذهب اليوم</K> و
            <K>سعر جرام الذهب في السعودية</K>، مع <K>جرام الذهب اليوم</K> و
            <K>غرام الذهب اليوم</K> و<K>سعر الجرام الذهب</K>.
          </p>
          <p>
            والأكثر طلباً للحُلي هو <K>سعر الذهب عيار 21</K> و<K>سعر الذهب اليوم عيار 21</K>{' '}
            و<K>سعر جرام الذهب عيار 21</K> و<K>سعر الذهب اليوم في السعودية عيار 21</K>،
            أي <K>ذهب عيار 21</K> و<K>ذهب عيار ٢١</K>.
          </p>
          <p>
            كما نغطّي <K>سعر الذهب عيار 24</K> و<K>سعر جرام الذهب عيار 24</K> و
            <K>ذهب عيار 24</K>، و<K>سعر الذهب عيار 22</K> و<K>سعر جرام الذهب عيار 22</K>{' '}
            و<K>ذهب عيار 22</K>، و<K>سعر الذهب عيار 18</K> و<K>سعر جرام الذهب عيار 18</K>{' '}
            و<K>ذهب عيار 18</K>.
          </p>
          <p>
            ونوضّح <K>سعر بيع الذهب اليوم</K> و<K>سعر بيع الذهب اليوم في السعودية</K> و
            <K>سعر بيع الذهب المستعمل اليوم في السعودية</K> و<K>الذهب المستعمل</K>،
            مع <K>بيع وشراء الذهب</K> و<K>كم سعر الذهب اليوم في السعودية بيع وشراء</K> و
            <K>مصنعية الذهب</K>، وأبرز <K>سوق الذهب</K> و<K>سوق الذهب اليوم</K> و
            <K>اسواق الذهب</K>.
          </p>
          <p>
            وللاستثمار نعرض <K>سبائك الذهب</K> و<K>سبائك ذهب</K> و<K>سبيكة ذهب</K> و
            <K>سعر سبيكة الذهب</K>، إضافةً إلى <K>سعر سبائك الذهب في السعودية اليوم</K> و
            <K>اسعار سبائك الذهب اليوم في السعودية</K> و<K>سعر سبيكة الذهب في السعودية</K>{' '}
            و<K>سعر سبيكة الذهب 100 جرام في السعودية اليوم</K>، مع <K>سعر كيلو الذهب</K> و
            <K>سعر جنيه الذهب في السعودية</K>.
          </p>
          <p>
            وعالمياً نوفّر <K>أونصة الذهب</K> و<K>اونصة الذهب</K> و<K>سعر أونصة الذهب</K>{' '}
            و<K>سعر اونصة الذهب</K> و<K>سعر اونصة الذهب في السعودية</K>؛ وللفضة{' '}
            <K>سعر الفضة اليوم</K> و<K>اسعار الفضة اليوم</K> و<K>سعر الفضة في السعودية</K>{' '}
            و<K>سعر الفضة اليوم في السعودية</K> و<K>اسعار الذهب والفضة اليوم</K>.
          </p>
          <p>
            وحسب مدينتك نعرض{' '}
            <Link href="/gold-price-riyadh" className="SSR">سعر الذهب اليوم في الرياض</Link>{' '}
            و<K>اسعار الذهب اليوم الرياض</K> و
            <Link href="/gold-price-jeddah" className="SSR">سعر الذهب اليوم في جدة</Link>{' '}
            و<K>اسعار الذهب اليوم جدة</K> و
            <Link href="/gold-price-makkah" className="SSR">سعر الذهب اليوم في مكة</Link> و
            <Link href="/gold-price-madinah" className="SSR">سعر الذهب اليوم في المدينة</Link> و
            <Link href="/gold-price-dammam" className="SSR">سعر الذهب اليوم في الدمام</Link>.
          </p>
          <p dir="ltr" style={{ textAlign: 'left' }}>
            For visitors searching in English: <K>saudi gold price today</K>,{' '}
            <K>gold price in saudi arabia</K>, <K>gold price today in saudi arabia</K>,{' '}
            <K>gold rate in saudi arabia</K>, <K>gold price ksa</K>.
          </p>

          {/* Pass 2 — short recap of the high-priority phrases (≈ second mention) */}
          <p>
            ونحدّث باستمرار <K>سعر الذهب اليوم</K> و<K>سعر الذهب اليوم في السعودية</K> و
            <K>اسعار الذهب</K> و<K>أسعار الذهب</K> و<K>الذهب اليوم</K> و
            <K>سعر الذهب مباشر</K> و<K>سعر الذهب الآن</K> و<K>سعر الذهب في السعودية</K> و
            <K>سعر الذهب في السعودية اليوم</K> و<K>الذهب اليوم في السعودية</K> و
            <K>سعر الذهب الآن في السعودية</K>.
          </p>
          <p>
            ويشمل ذلك <K>سعر جرام الذهب</K> و<K>سعر جرام الذهب اليوم</K> و
            <K>سعر جرام الذهب في السعودية</K> و<K>جرام الذهب اليوم</K> و
            <K>غرام الذهب اليوم</K>، ثم <K>سعر الذهب عيار 21</K> و<K>سعر جرام الذهب عيار 21</K>{' '}
            و<K>ذهب عيار 21</K> و<K>سعر الذهب عيار 24</K> و<K>ذهب عيار 24</K> و
            <K>سعر الذهب عيار 22</K> و<K>سعر الذهب عيار 18</K>.
          </p>
          <p>
            ولا ننسى <K>سعر بيع الذهب اليوم</K> و<K>سعر بيع الذهب المستعمل اليوم في السعودية</K>{' '}
            و<K>الذهب المستعمل</K> و<K>مصنعية الذهب</K> و<K>سوق الذهب</K>، و<K>سبائك الذهب</K> و
            <K>سبيكة ذهب</K> و<K>سعر سبائك الذهب في السعودية اليوم</K> و<K>سعر كيلو الذهب</K>،
            مع <K>سعر أونصة الذهب</K> و<K>اونصة الذهب</K> و<K>سعر الفضة اليوم</K> و
            <K>سعر الفضة في السعودية</K>، و<K>سعر الذهب اليوم في الرياض</K> و
            <K>سعر الذهب اليوم في جدة</K> و<K>سعر الذهب اليوم في مكة</K> و
            <K>سعر الذهب اليوم في الدمام</K>.
          </p>
          <p>
            ونغطّي كذلك <K>سعر سبيكة الذهب</K> و<K>سعر سبيكة الذهب في السعودية</K> و
            <K>اسعار سبائك الذهب اليوم في السعودية</K> و<K>سعر جنيه الذهب في السعودية</K>،
            مع <K>سعر اونصة الذهب في السعودية</K> و<K>اسعار الفضة اليوم</K> و
            <K>سعر الفضة اليوم في السعودية</K> و<K>اسعار الذهب والفضة اليوم</K>، و
            <K>اسعار الذهب اليوم الرياض</K> و<K>اسعار الذهب اليوم جدة</K> و
            <K>سعر الجرام الذهب</K>.
          </p>

          {/* Minimal SSR navigation to the karat detail pages (kept crawlable) */}
          <p>
            تصفّح التفاصيل:{' '}
            <Link href="/karat-21" className="text-gold">عيار 21</Link> ·{' '}
            <Link href="/karat-24" className="text-gold">عيار 24</Link> ·{' '}
            <Link href="/gold-bars" className="text-gold">السبائك</Link> ·{' '}
            <Link href="/silver" className="text-gold">الفضة</Link> ·{' '}
            <Link href="/calculator" className="text-gold">الحاسبة</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
