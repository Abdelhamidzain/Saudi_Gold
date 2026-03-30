import Link from 'next/link';

export const metadata = {
  title: 'الصفحة غير موجودة - أسعار الذهب في السعودية',
  description: 'الصفحة التي تبحث عنها غير موجودة. تصفح أسعار الذهب اليوم في السعودية.',
};

export default function NotFound() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      direction: 'rtl',
    }}>
      <h1 style={{ fontSize: '4rem', color: '#D4AF37', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>الصفحة غير موجودة</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        عذراً، الصفحة التي تبحث عنها غير متاحة أو تم نقلها.
      </p>
      <Link
        href="/"
        style={{
          backgroundColor: '#D4AF37',
          color: '#fff',
          padding: '12px 32px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        العودة للصفحة الرئيسية
      </Link>
    </div>
  );
}
