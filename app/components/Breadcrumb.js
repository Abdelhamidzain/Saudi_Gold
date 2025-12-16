import Link from 'next/link';

const SITE_URL = 'https://saudi-gold.com';

export default function Breadcrumb({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav className="breadcrumb" aria-label="التنقل">
        {items.map((item, index) => (
          <span key={index}>
            {item.href ? (
              <Link href={item.href}>{item.name}</Link>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
            {index < items.length - 1 && (
              <span className="breadcrumb-sep" aria-hidden="true"> / </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
