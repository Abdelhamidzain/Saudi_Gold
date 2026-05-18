import CityPage from '../components/CityPage';

export const revalidate = 3600;

export const metadata = {
  title: 'سعر الذهب اليوم في الخبر | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في الخبر محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في الخبر.',
  keywords: ['سعر الذهب في الخبر', 'سعر الذهب اليوم في الخبر', 'اسعار الذهب الخبر', 'سوق الذهب الخبر', 'محلات الذهب الخبر'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-khobar',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في الخبر | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في الخبر محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function KhobarGoldPage() {
  return <CityPage citySlug="gold-price-khobar" />;
}
