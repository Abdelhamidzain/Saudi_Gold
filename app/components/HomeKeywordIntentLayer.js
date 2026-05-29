import Link from 'next/link';
import { fmt } from '../lib/gold';

/*
 * HomeKeywordIntentLayer — the compact, SERVER-RENDERED keyword-intent layer.
 *
 * Purpose: keep every primary keyword cluster present in the initial HTML in a
 * form that is visible and useful to users (grouped intent cards with a short
 * description + natural anchor links), NOT a raw keyword list. This is the
 * crawl-relevance backbone that stays in raw HTML after the long explanatory
 * prose is deferred to the client (HomeSeoDetailsClient, ssr:false).
 *
 * It never uses LivePriceUpdater's selectors. Dynamic prices use the inert
 * .seo-price class only.
 */

const SeoPrice = ({ v }) =>
  typeof v === 'number' && !isNaN(v) ? (
    <strong className="seo-price">{fmt(v)} ر.س</strong>
  ) : (
    <strong className="seo-price">يُحدّث لحظياً</strong>
  );

export default function HomeKeywordIntentLayer({ prices }) {
  const gram21 = prices?.[21]?.gram;
  const gram24 = prices?.[24]?.gram;

  const groups = [
    {
      title: 'السعر المباشر',
      desc: (
        <>
          أسعار الذهب اليوم في السعودية بالريال محدّثة لحظياً من البورصة
          العالمية — تابع سعر الذهب الآن دون انتظار.
        </>
      ),
      links: [
        { href: '/', label: 'سعر الذهب اليوم' },
        { href: '#table', label: 'جدول الأسعار المباشر' },
      ],
    },
    {
      title: 'سعر الجرام',
      desc: (
        <>
          سعر جرام الذهب اليوم لكل العيارات، ويُشتق من قيمة الأونصة العالمية.
          جرام عيار 21 الآن نحو <SeoPrice v={gram21} />.
        </>
      ),
      links: [
        { href: '/calculator', label: 'حاسبة سعر الجرام' },
        { href: '/ounce', label: 'سعر أونصة الذهب' },
      ],
    },
    {
      title: 'العيارات',
      desc: (
        <>
          سعر الذهب عيار 21 و24 و22 و18 — عيار 21 الأكثر تداولاً للحُلي، وعيار
          24 الخام مرجع التسعير ونحو <SeoPrice v={gram24} /> للجرام.
        </>
      ),
      links: [
        { href: '/karat-21', label: 'عيار 21' },
        { href: '/karat-24', label: 'عيار 24' },
        { href: '/karat-22', label: 'عيار 22' },
        { href: '/karat-18', label: 'عيار 18' },
      ],
    },
    {
      title: 'البيع والشراء',
      desc: (
        <>
          فارق سعر البيع والشراء وسعر بيع الذهب المستعمل اليوم في السعودية، مع
          رسوم المصنعية التي تُضاف على القطع الجديدة.
        </>
      ),
      links: [
        { href: '/buy-sell', label: 'بيع وشراء الذهب' },
        { href: '/workmanship', label: 'مصنعية الذهب' },
      ],
    },
    {
      title: 'السبائك',
      desc: (
        <>
          سعر سبائك الذهب في السعودية اليوم — سبيكة ذهب عيار 24 استثمارية بأوزان
          من غرام حتى كيلو وبهامش ضئيل فوق السوق.
        </>
      ),
      links: [
        { href: '/gold-bars', label: 'أسعار السبائك' },
        { href: '/zakat', label: 'زكاة الذهب' },
      ],
    },
    {
      title: 'الفضة',
      desc: (
        <>
          سعر الفضة اليوم في السعودية بالريال للغرام والأونصة والكيلو، محدّث من
          المصدر العالمي نفسه.
        </>
      ),
      links: [{ href: '/silver', label: 'سعر الفضة اليوم' }],
    },
    {
      title: 'الأسعار حسب المدينة',
      desc: (
        <>
          أسعار الذهب اليوم في الرياض وجدة ومكة والمدينة والدمام — السعر موحّد
          وتختلف المصنعية فقط من محل لآخر.
        </>
      ),
      links: [
        { href: '/gold-price-riyadh', label: 'الرياض' },
        { href: '/gold-price-jeddah', label: 'جدة' },
        { href: '/gold-price-makkah', label: 'مكة المكرمة' },
        { href: '/gold-price-madinah', label: 'المدينة المنورة' },
        { href: '/gold-price-dammam', label: 'الدمام' },
      ],
    },
  ];

  return (
    <section className="section" id="intent">
      <div className="container">
        <div className="info-section">
          <h2>أهم أسعار الذهب اليوم في السعودية</h2>
          <p>
            كل ما تبحث عنه عن سعر الذهب في السعودية اليوم في مكان واحد: السعر
            المباشر، سعر الجرام والعيارات، البيع والشراء، السبائك، الفضة،
            والأسعار حسب المدينة. اختر القسم الذي يهمّك للانتقال إلى تفاصيله.
          </p>
          <div className="kw-intent">
            {groups.map((g) => (
              <div key={g.title} className="kw-group">
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
                <div className="kw-group-links">
                  {g.links.map((l) => (
                    <Link key={l.href + l.label} href={l.href} prefetch={false}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
