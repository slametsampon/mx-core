// plugins/mx-core-metric/src/components/Header.tsx

/**
 * @file Header.tsx
 * @description
 * Komponen Header utama untuk plugin `mx-core-metric`.
 * Berisi logo plugin, navigasi link, dan informasi pengguna (UserInfoPlugin).
 *
 * Digunakan pada seluruh halaman plugin dan biasanya disematkan di `layout.tsx` plugin.
 *
 * 🎯 Fokus desain:
 * - Kompatibel dengan dark/light mode
 * - Responsif dengan menu mobile (`MobileNav`)
 * - Navigasi yang diambil dari konfigurasi `headerNavLinks`
 * - Tautan kembali ke home plugin (`CustomLink`)
 * - Panel user-info di kanan atas (`UserInfoPlugin`)
 */

'use client';

import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import CustomLink from './CustomLink';
import MobileNav from './MobileNav';
import UserInfoPlugin from './UserInfoPlugin';

/**
 * Komponen header plugin yang merender:
 * - Logo plugin (`Metric Plugin`)
 * - Navigasi utama dari `headerNavLinks` (kecuali halaman "/")
 * - Navigasi mobile (`MobileNav`) untuk screen kecil
 * - Informasi user login (`UserInfoPlugin`)
 *
 * @returns {JSX.Element} Komponen header
 */
const Header = () => {
  return (
    <header className="flex items-center justify-between rounded-xl bg-green-50 px-3 py-2 shadow-sm dark:bg-gray-900">
      {/* Kiri: Logo / Judul Plugin */}
      <div>
        <CustomLink href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3 rounded-lg border border-gray-300 p-1 shadow-sm dark:border-gray-600">
              📈 Metric Plugin
            </div>
          </div>
        </CustomLink>
      </div>

      {/* Kanan: Navigasi & Info User */}
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {/* Navigasi desktop (hide "/" untuk mencegah duplikasi logo) */}
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

        {/* Navigasi mobile (dropdown menu) */}
        <MobileNav />

        {/* Panel user info (login/logout, avatar, dll) */}
        <UserInfoPlugin />
      </div>
    </header>
  );
};

export default Header;
