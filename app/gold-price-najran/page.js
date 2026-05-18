import CityPage from '../components/CityPage';

export const revalidate = 3600;

export const metadata = {
  title: 'سعر الذهب اليوم في نجران | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في نجران محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في نجران.',
  keywords: ['سعر الذهب في نجران', 'سعر الذهب اليوم في نجران', 'اسعار الذهب نجران', 'سوق الذهب نجران', 'محلات الذهب نجران'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-najran',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في نجران | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في نجران محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function NajranGoldPage() {
  return <CityPage citySlug="gold-price-najran" />;
}
