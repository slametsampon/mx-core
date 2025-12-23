// apps/frontend/components/Header.tsx

'use client';

import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import CustomLink from './CustomLink';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-2 shadow-sm dark:bg-slate-800">
      {/* 🔷 BRAND / LOGO */}
      <CustomLink href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center space-x-2">
          <div className="rounded-md border border-indigo-300 bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700 shadow-sm dark:border-indigo-500 dark:bg-indigo-900 dark:text-indigo-100">
            🚀 Mx-Core
          </div>
        </div>
      </CustomLink>

      {/* 🌐 NAVIGATION */}
      <nav className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <CustomLink
              key={link.title}
              href={link.href}
              className="hidden p-1 text-sm font-semibold italic transition hover:text-indigo-600 dark:hover:text-indigo-300 sm:inline"
            >
              {link.title}
            </CustomLink>
          ))}
        <MobileNav />
      </nav>
    </header>
  );
};

export default Header;
