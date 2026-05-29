'use client';

import dynamic from 'next/dynamic';

// كل ما عدا (H1 + جدول العيارات + لينكات المدن) يتحمّل client-side فقط (ssr:false)
// فلا يظهر في الـ HTML الخام.
const Content = dynamic(() => import('./HomeRestContent'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '400px' }} aria-hidden="true" />,
});

export default function HomeRest(props) {
  return <Content {...props} />;
}
