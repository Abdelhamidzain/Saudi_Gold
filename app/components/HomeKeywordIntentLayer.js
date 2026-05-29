import Link from 'next/link';
import { fmt } from '../lib/gold';

/*
 * HomeKeywordIntentLayer — the compact, SERVER-RENDERED keyword-intent hub.
 *
 * Goal: keep a broad set of homepage-relevant search phrases in the initial
 * HTML as VISIBLE, USEFUL grouped chips (links where a relevant page exists,
 * plain text otherwise) — NOT a raw comma list, NOT hidden text. Long
 * explanatory prose lives client-only in HomeSeoDetailsClient.
 *
 * Server Component (no 'use client', no dynamic). Never uses LivePriceUpdater
 * selectors; the only dynamic value uses the inert .seo-price class.
 *
 * Chip shape: { t: <label> } renders plain <span>; { t, h } renders a <Link>.
 * Links are limited to representative intent chips (we do not link every
 * orthographic variant to the same URL).
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
      title: 'أسعار الذهب اليوم',
      desc: <>أبرز عبارات البحث عن سعر الذهب اليوم مباشرةً.</>,
      chips: [
        { t: 'اسعار الذهب' },
        { t: 'أسعار الذهب' },
        { t: 'سعر الذهب اليوم', h: '/' },
        { t: 'الذهب اليوم' },
        { t: 'سعر الذهب' },
        { t: 'الذهب الآن' },
        { t: 'اسعار الذهب اليوم' },
        { t: 'أسعار الذهب اليوم' },
        { t: 'سعر الذهب مباشر', h: '#table' },
      ],
    },
    {
      title: 'الذهب في السعودية',
      desc: <>سعر الذهب في السعودية اليوم بكل صيغ البحث الشائعة.</>,
      chips: [
        { t: 'اسعار الذهب في السعودية' },
        { t: 'أسعار الذهب في السعودية' },
        { t: 'اسعار الذهب اليوم في السعودية' },
        { t: 'سعر الذهب اليوم في السعودية', h: '/gold-price-saudi-arabia' },
        { t: 'سعر الذهب في السعودية' },
        { t: 'سعر الذهب في السعودية اليوم' },
        { t: 'الذهب في السعودية' },
        { t: 'الذهب اليوم في السعودية' },
        { t: 'سعر الذهب الآن في السعودية' },
        { t: 'اسعار الذهب في السعودية تحديث يومي' },
        { t: 'سعر الذهب اليوم في السعودية تحديث يومي' },
      ],
    },
    {
      title: 'سعر جرام الذهب',
      desc: (
        <>
          قيمة جرام الذهب اليوم لكل صيغ البحث — عيار 21 الآن نحو{' '}
          <SeoPrice v={gram21} />.
        </>
      ),
      chips: [
        { t: 'سعر جرام الذهب', h: '/calculator' },
        { t: 'سعر جرام الذهب اليوم' },
        { t: 'سعر جرام الذهب في السعودية' },
        { t: 'سعر جرام الذهب في السعودية اليوم' },
        { t: 'جرام الذهب اليوم' },
        { t: 'جرام الذهب في السعودية' },
        { t: 'جرام الذهب اليوم في السعودية' },
        { t: 'غرام الذهب اليوم' },
        { t: 'سعر الجرام الذهب' },
        { t: 'سعر الجرام الذهب في السعودية' },
      ],
    },
    {
      title: 'الذهب عيار 21',
      desc: <>سعر الذهب عيار 21، الأكثر تداولاً للحُلي في السعودية.</>,
      chips: [
        { t: 'سعر الذهب عيار 21', h: '/karat-21' },
        { t: 'سعر الذهب اليوم عيار 21' },
        { t: 'سعر جرام الذهب عيار 21' },
        { t: 'سعر الذهب اليوم في السعودية عيار 21' },
        { t: 'ذهب عيار 21' },
        { t: 'ذهب عيار ٢١' },
        { t: 'سعر بيع الذهب المستعمل اليوم في السعودية عيار 21', h: '/buy-sell' },
        { t: 'كم سعر الذهب اليوم في السعودية بيع وشراء عيار 21' },
      ],
    },
    {
      title: 'باقي العيارات',
      desc: (
        <>
          أسعار الذهب عيار 24 و22 و18 — عيار 24 الخام نحو <SeoPrice v={gram24} />{' '}
          للجرام.
        </>
      ),
      chips: [
        { t: 'سعر الذهب عيار 24', h: '/karat-24' },
        { t: 'سعر جرام الذهب عيار 24' },
        { t: 'ذهب عيار 24' },
        { t: 'سعر الذهب عيار 22', h: '/karat-22' },
        { t: 'سعر جرام الذهب عيار 22' },
        { t: 'ذهب عيار 22' },
        { t: 'سعر الذهب عيار 18', h: '/karat-18' },
        { t: 'سعر جرام الذهب عيار 18' },
        { t: 'ذهب عيار 18' },
        { t: 'عيار الذهب اليوم' },
      ],
    },
    {
      title: 'البيع والشراء والأسواق',
      desc: <>سعر بيع الذهب اليوم والذهب المستعمل وأسواق الصاغة.</>,
      chips: [
        { t: 'سعر بيع الذهب اليوم' },
        { t: 'سعر بيع الذهب اليوم في السعودية' },
        { t: 'سعر بيع الذهب المستعمل اليوم في السعودية', h: '/buy-sell' },
        { t: 'الذهب المستعمل' },
        { t: 'بيع وشراء الذهب' },
        { t: 'كم سعر الذهب اليوم في السعودية بيع وشراء' },
        { t: 'مصنعية الذهب', h: '/workmanship' },
        { t: 'سوق الذهب', h: '/markets' },
        { t: 'سوق الذهب اليوم' },
        { t: 'اسواق الذهب' },
        { t: 'سوق ذهب' },
      ],
    },
    {
      title: 'السبائك والجنيه',
      desc: <>سعر سبائك الذهب والجنيه والكيلو في السعودية اليوم.</>,
      chips: [
        { t: 'سبائك الذهب', h: '/gold-bars' },
        { t: 'سبائك ذهب' },
        { t: 'سبيكة ذهب' },
        { t: 'سعر سبيكة الذهب' },
        { t: 'سعر سبائك الذهب في السعودية اليوم' },
        { t: 'اسعار سبائك الذهب اليوم في السعودية' },
        { t: 'سعر سبيكة الذهب في السعودية' },
        { t: 'سعر سبيكة الذهب 100 جرام في السعودية اليوم' },
        { t: 'سعر كيلو الذهب' },
        { t: 'سعر جنيه الذهب في السعودية' },
      ],
    },
    {
      title: 'الأونصة والكيلو',
      desc: <>سعر أونصة الذهب وكيلو الذهب بالريال السعودي.</>,
      chips: [
        { t: 'اونصة الذهب' },
        { t: 'أونصة الذهب' },
        { t: 'سعر اونصة الذهب' },
        { t: 'سعر أونصة الذهب', h: '/ounce' },
        { t: 'سعر اونصة الذهب في السعودية' },
        { t: 'سعر كيلو الذهب' },
        { t: 'كيلو الذهب' },
      ],
    },
    {
      title: 'الفضة',
      desc: <>سعر الفضة اليوم في السعودية بالريال للغرام والأونصة والكيلو.</>,
      chips: [
        { t: 'سعر الفضة اليوم', h: '/silver' },
        { t: 'اسعار الفضة اليوم' },
        { t: 'أسعار الفضة اليوم' },
        { t: 'سعر الفضة في السعودية' },
        { t: 'سعر الفضة اليوم في السعودية' },
        { t: 'اسعار الذهب والفضة اليوم' },
        { t: 'سعر كيلو الفضة اليوم' },
      ],
    },
    {
      title: 'الأسعار حسب المدينة',
      desc: <>سعر الذهب اليوم في مدن السعودية الكبرى.</>,
      chips: [
        { t: 'سعر الذهب اليوم في الرياض', h: '/gold-price-riyadh' },
        { t: 'اسعار الذهب اليوم الرياض' },
        { t: 'سعر الذهب اليوم في جدة', h: '/gold-price-jeddah' },
        { t: 'اسعار الذهب اليوم جدة' },
        { t: 'سعر الذهب اليوم في مكة', h: '/gold-price-makkah' },
        { t: 'سعر الذهب اليوم في المدينة', h: '/gold-price-madinah' },
        { t: 'سعر الذهب اليوم في الدمام', h: '/gold-price-dammam' },
      ],
    },
    {
      title: 'English queries',
      desc: <>Common English searches for Saudi gold prices.</>,
      ltr: true,
      chips: [
        { t: 'saudi gold price today' },
        { t: 'gold price in saudi arabia', h: '/gold-price-saudi-arabia' },
        { t: 'gold price today in saudi arabia' },
        { t: 'gold rate in saudi arabia' },
        { t: 'gold price ksa' },
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
            المباشر، سعر الجرام والعيارات، البيع والشراء، السبائك، الأونصة،
            الفضة، والأسعار حسب المدينة. اختر ما يهمّك للانتقال إلى تفاصيله.
          </p>
          <div className="kw-intent">
            {groups.map((g) => (
              <div key={g.title} className="kw-group">
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
                <div
                  className="kw-group-links"
                  dir={g.ltr ? 'ltr' : undefined}
                >
                  {g.chips.map((c) =>
                    c.h ? (
                      <Link key={c.t} href={c.h} prefetch={false}>
                        {c.t}
                      </Link>
                    ) : (
                      <span key={c.t} className="kw-chip">
                        {c.t}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
