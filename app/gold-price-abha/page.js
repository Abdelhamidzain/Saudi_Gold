import CityPage from '../components/CityPage';

export const revalidate = 3600;

export const metadata = {
  title: 'سعر الذهب اليوم في أبها | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في أبها محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في أبها.',
  keywords: ['سعر الذهب في أبها', 'سعر الذهب اليوم في أبها', 'اسعار الذهب أبها', 'سوق الذهب أبها', 'محلات الذهب أبها'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-abha',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في أبها | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في أبها محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function AbhaGoldPage() {
  return <CityPage citySlug="gold-price-abha" />;
}
