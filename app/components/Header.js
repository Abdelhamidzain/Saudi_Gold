'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'الأسعار' },
  { href: '/karat-21', label: 'عيار 21' },
  { href: '/gold-bars', label: 'السبائك' },
  { href: '/calculator', label: 'الحاسبة' },
  { href: '/zakat', label: 'الزكاة' },
  { href: '/markets', label: 'الأسواق' },
  { href: '/blog', label: 'المدونة' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo" aria-label="الصفحة الرئيسية">
            <span className="logo-icon" aria-hidden="true">🪙</span>
            <span className="text-gold">سعودي قولد</span>
          </Link>
          
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={menuOpen}
          >
            <span></span>
          </button>
          
          <nav className={`nav ${menuOpen ? 'open' : ''}`} role="navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
