import CityPage from '../components/CityPage';

export const revalidate = 3600;

export const metadata = {
  title: 'سعر الذهب اليوم في الطائف | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في الطائف محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في الطائف.',
  keywords: ['سعر الذهب في الطائف', 'سعر الذهب اليوم في الطائف', 'اسعار الذهب الطائف', 'سوق الذهب الطائف', 'محلات الذهب الطائف'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-taif',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في الطائف | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في الطائف محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function TaifGoldPage() {
  return <CityPage citySlug="gold-price-taif" />;
}
