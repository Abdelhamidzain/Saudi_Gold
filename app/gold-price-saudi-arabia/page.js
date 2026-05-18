import PageClient from './PageClient';

// Static at build, no traffic-driven ISR writes from this page itself.
// Long revalidate because the only server-rendered content is static
// (H1 + intro). The dynamic price UI lives entirely on the client.
export const revalidate = 86400;

const SITE_URL = 'https://saudi-gold.com';
const PAGE_PATH = '/gold-price-saudi-arabia';
const CANONICAL = `${SITE_URL}${PAGE_PATH}`;

export const metadata = {
  title: 'سعر الذهب في السعودية اليوم بالريال السعودي | Saudi Gold',
  description:
    'تابع سعر الذهب في السعودية اليوم بالريال السعودي، واعرف أسعار الذهب حسب العيار مثل عيار 24 و21 و18، مع حاسبة ذهب ومعلومات تساعدك قبل الشراء أو البيع.',
  keywords: [
    'سعر الذهب في السعودية اليوم',
    'سعر الذهب في السعودية',
    'سعر الذهب اليوم في السعودية',
    'سعر جرام الذهب في السعودية',
    'سعر الذهب عيار 24 في السعودية',
    'سعر الذهب عيار 22 في السعودية',
    'سعر الذهب عيار 21 في السعودية',
    'سعر الذهب عيار 18 في السعودية',
    'أسعار الذهب في السعودية بالريال السعودي',
    'حاسبة الذهب في السعودية',
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: 'سعر الذهب في السعودية اليوم بالريال السعودي',
    description:
      'سعر الذهب في السعودية اليوم لكل العيارات مع حاسبة الذهب وأهم المعلومات قبل الشراء أو البيع.',
    url: CANONICAL,
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function GoldPriceSaudiArabiaPage() {
  // ── Technical JSON-LD (allowed: structural metadata, not visible content) ──
  // Removed ItemList (would have referenced live prices not in initial HTML).
  // Removed FAQPage (would have referenced Q&A not in initial HTML — schema
  // must match visible content per Google guidelines).
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'سعر الذهب في السعودية اليوم بالريال السعودي',
    description:
      'صفحة لمتابعة سعر الذهب في السعودية اليوم بالريال السعودي مع شرح وحاسبة الذهب.',
    url: CANONICAL,
    inLanguage: 'ar',
    isPartOf: { '@type': 'WebSite', name: 'سعودي قولد', url: SITE_URL },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'سعر الذهب في السعودية اليوم', item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Server-rendered visible content (the only two items) ── */}
      <h1>سعر الذهب في السعودية اليوم</h1>
      <p>
        تابع سعر الذهب في السعودية اليوم بالريال السعودي، مع تحديثات واضحة لأسعار الذهب
        حسب العيار، مثل عيار 24 وعيار 22 وعيار 21 وعيار 18. تساعدك هذه الصفحة على معرفة
        سعر جرام الذهب، مقارنة الفروقات بين العيارات، وفهم العوامل التي تؤثر على حركة
        الذهب في السوق السعودي قبل الشراء أو البيع.
      </p>

      {/* Everything else — header, footer, navigation, price UI, calculator,
          educational content, FAQ, internal links — lives in PageClient and
          renders only AFTER React hydrates on the client. Initial HTML from
          this component is empty (mounted gate). */}
      <PageClient />
    </>
  );
}
