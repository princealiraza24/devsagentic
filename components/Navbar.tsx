'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import BrandMark from '@/components/BrandMark';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/tools', label: 'Tools' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <Link href="/" className="hover:text-blue-700 transition-colors" aria-label="DevsAgentic home">
          <BrandMark />
        </Link>
        <nav className="hidden md:flex gap-6 items-center font-medium text-slate-600" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-blue-600 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden p-2 text-slate-600"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      {isOpen && (
        <nav className="md:hidden border-t border-slate-200 bg-white px-4 py-3" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
