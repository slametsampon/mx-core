// components/Header.tsx

'use client';
import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import Logo from '@/data/logo75x35.svg';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';

const Header = () => {
  return (
    <header className="flex items-center justify-between rounded-xl bg-green-50 py-5 shadow-sm dark:bg-gray-900">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3 rounded-lg border border-gray-300 shadow-sm dark:border-gray-600">
              <Logo />
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="link-active hidden p-1 font-semibold text-blue-700 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
