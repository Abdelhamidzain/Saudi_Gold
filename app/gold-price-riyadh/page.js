import CityPage from '../components/CityPage';

export const revalidate = 3600;

export const metadata = {
  title: 'سعر الذهب اليوم في الرياض | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في الرياض محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في الرياض.',
  keywords: ['سعر الذهب في الرياض', 'سعر الذهب اليوم في الرياض', 'اسعار الذهب الرياض', 'سوق الذهب الرياض', 'محلات الذهب الرياض'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-riyadh',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في الرياض | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في الرياض محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function RiyadhGoldPage() {
  return <CityPage citySlug="gold-price-riyadh" />;
}
