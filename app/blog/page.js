import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export const metadata = {
  title: 'مدونة سعودي قولد | مقالات عن الذهب والاستثمار في السعودية',
  description: 'مقالات ودليل شامل عن شراء الذهب والاستثمار فيه في السعودية. نصائح، إرشادات، وأحدث الأخبار عن سوق الذهب السعودي.',
  keywords: ['مدونة الذهب', 'دليل شراء الذهب', 'استثمار الذهب السعودية', 'نصائح شراء الذهب'],
  alternates: {
    canonical: 'https://saudi-gold.com/blog',
  },
  openGraph: {
    title: 'مدونة سعودي قولد | مقالات عن الذهب',
    description: 'دليلك الشامل لشراء الذهب والاستثمار فيه في المملكة العربية السعودية',
  },
};

const articles = [
  {
    slug: 'gold-buying-guide-saudi',
    title: 'دليل شراء الذهب في السعودية 2026 - كل ما تحتاج معرفته',
    excerpt: 'دليل شامل ومفصل لشراء الذهب في المملكة العربية السعودية. من اختيار العيار المناسب إلى التفاوض على المصنعية وأفضل الأماكن للشراء.',
    date: '2025-12-15',
    readTime: '8 دقائق',
    icon: '📖',
    category: 'دليل شراء',
  },
  {
    slug: 'gold-investment-saudi-2026',
    title: 'الاستثمار في الذهب في السعودية 2026 - دليل المبتدئين',
    excerpt: 'تعرف على أفضل طرق الاستثمار في الذهب بالمملكة العربية السعودية. سبائك، عملات، صناديق ETF، وأكثر.',
    date: '2025-11-20',
    readTime: '10 دقائق',
    icon: '📈',
    category: 'استثمار',
  },
  {
    slug: 'difference-gold-karats',
    title: 'الفرق بين عيارات الذهب 24 و 22 و 21 و 18 - أيهم أفضل؟',
    excerpt: 'شرح مفصل للفرق بين عيارات الذهب المختلفة من حيث النقاوة والسعر والاستخدام. أيهم أفضل للمجوهرات وأيهم للاستثمار.',
    date: '2025-10-10',
    readTime: '6 دقائق',
    icon: '💎',
    category: 'تعليم',
  },
  {
    slug: 'best-time-buy-gold',
    title: 'أفضل وقت لشراء الذهب في السعودية - نصائح الخبراء',
    excerpt: 'متى يكون أفضل وقت لشراء الذهب؟ تعرف على العوامل المؤثرة في أسعار الذهب ونصائح لاختيار التوقيت المناسب.',
    date: '2025-09-05',
    readTime: '7 دقائق',
    icon: '⏰',
    category: 'نصائح',
  },
  {
    slug: 'gold-zakat-guide',
    title: 'زكاة الذهب - دليل شامل لحساب الزكاة على الذهب',
    excerpt: 'كيف تحسب زكاة الذهب؟ النصاب، الشروط، وطريقة الحساب الصحيحة مع أمثلة عملية وحاسبة تلقائية.',
    date: '2025-08-15',
    readTime: '5 دقائق',
    icon: '🕌',
    category: 'شرعي',
  },
];

export default function BlogIndex() {
  return (
    <>
      <Header />
      <main className="container">
        <Breadcrumb items={[
          { name: 'الرئيسية', href: '/' },
          { name: 'المدونة' },
        ]} />

        <section className="hero">
          <h1>مدونة سعودي قولد</h1>
          <p className="hero-subtitle">
            مقالات ودليل شامل عن شراء الذهب والاستثمار فيه في المملكة العربية السعودية
          </p>
        </section>

        <section className="section">
          <div className="blog-grid">
            {articles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="blog-card">
                <div className="blog-card-icon">{article.icon}</div>
                <div className="blog-card-category">{article.category}</div>
                <h2 className="blog-card-title">{article.title}</h2>
                <p className="blog-card-excerpt">{article.excerpt}</p>
                <div className="blog-card-meta">
                  <span>{article.readTime} قراءة</span>
                  <span>{new Date(article.date).toLocaleDateString('ar-SA')}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
