import CityPage from '../components/CityPage';

export const revalidate = 60;

export const metadata = {
  title: 'سعر الذهب اليوم في الدمام | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في الدمام محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في الدمام.',
  keywords: ['سعر الذهب في الدمام', 'سعر الذهب اليوم في الدمام', 'اسعار الذهب الدمام', 'سوق الذهب الدمام', 'محلات الذهب الدمام'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-dammam',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في الدمام | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في الدمام محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function DammamGoldPage() {
  return <CityPage citySlug="gold-price-dammam" />;
}
