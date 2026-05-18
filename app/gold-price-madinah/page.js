import CityPage from '../components/CityPage';

export const revalidate = 3600;

export const metadata = {
  title: 'سعر الذهب اليوم في المدينة المنورة | أسعار جميع العيارات محدثة',
  description: 'سعر الذهب اليوم في المدينة المنورة محدث لحظياً بالريال السعودي. أسعار جرام الذهب عيار 21 و 24 و 22 و 18 مع أفضل أسواق ومحلات الذهب في المدينة المنورة.',
  keywords: ['سعر الذهب في المدينة المنورة', 'سعر الذهب اليوم في المدينة المنورة', 'اسعار الذهب المدينة المنورة', 'سوق الذهب المدينة المنورة', 'محلات الذهب المدينة المنورة'],
  alternates: {
    canonical: 'https://saudi-gold.com/gold-price-madinah',
  },
  openGraph: {
    title: 'سعر الذهب اليوم في المدينة المنورة | محدث لحظياً',
    description: 'سعر جرام الذهب عيار 21 في المدينة المنورة محدث لحظياً بالريال السعودي مع أسعار جميع العيارات',
  },
};

export default function MadinahGoldPage() {
  return <CityPage citySlug="gold-price-madinah" />;
}
