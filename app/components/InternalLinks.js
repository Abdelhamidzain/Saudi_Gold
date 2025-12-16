import Link from 'next/link';

export default function InternalLinks({ links }) {
  return (
    <div className="internal-links">
      {links.map((link, index) => (
        <Link key={index} href={link.href} className="internal-link">
          {link.icon && <span aria-hidden="true">{link.icon}</span>}
          {link.label}
        </Link>
      ))}
    </div>
  );
}
