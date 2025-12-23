// plugins/mx-core-metric/src/components/Header.tsx

'use client';
import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import CustomLink from './CustomLink';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className="flex items-center justify-between rounded-xl bg-green-50 px-3 py-2 shadow-sm dark:bg-gray-900">
      <div>
        <CustomLink href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3 rounded-lg border border-gray-300 p-1 shadow-sm dark:border-gray-600">
              📈 Metric Plugin
            </div>
          </div>
        </CustomLink>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <CustomLink
              key={link.title}
              href={link.href}
              className="link-active hidden p-1 font-semibold text-blue-700 dark:text-gray-100 sm:block"
            >
              {link.title}
            </CustomLink>
          ))}
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
