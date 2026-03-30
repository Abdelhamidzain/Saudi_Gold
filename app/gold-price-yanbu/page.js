import CityPage from '../components/CityPage';

export const revalidate = 60;

export const metadata = {
  title: 'سعر الذهب اليوم في ينبع | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في ينبع محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في ينبع.',
  keywords: ['سعر الذهب في ينبع', 'سعر الذهب اليوم في ينبع', 'اسعار الذهب ينبع', 'سوق الذهب ينبع', 'محلات الذهب ينبع'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-yanbu',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في ينبع | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في ينبع محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function YanbuGoldPage() {
  return <CityPage citySlug="gold-price-yanbu" />;
}
