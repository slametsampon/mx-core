// apps/frontend/components/Header.tsx

/**
 * @file Header.tsx
 * @description Komponen header utama aplikasi.
 *
 * Menampilkan logo, informasi user (avatar, nama, login/logout), serta toggle tema.
 * Bertanggung jawab memantau perubahan status autentikasi dan mengatur navigasi login/logout.
 *
 * 🔗 Relasi:
 * - Menggunakan `AuthService` untuk mendapatkan dan menghapus user saat login/logout.
 * - Menggunakan `UserInfo` untuk menampilkan informasi pengguna dan opsi dropdown.
 * - Menggunakan `ThemeToggle` untuk beralih dark/light mode.
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import siteMetadata from '@/data/siteMetadata';
import CustomLink from './CustomLink';
import ThemeToggle from './ThemeToggle';
import UserInfo from './UserInfo';
import { AuthService } from '@/services/auth-service';

/**
 * Komponen Header aplikasi.
 *
 * - Menampilkan logo aplikasi (`MX-Core`)
 * - Menampilkan `UserInfo` berdasarkan status login
 * - Mengatur navigasi ke `/login` saat login
 * - Menghapus session saat logout
 *
 * @component
 * @example
 * <Header />
 */
export default function Header() {
  const router = useRouter();

  /**
   * Data user aktif, diambil dari localStorage melalui `AuthService`.
   */
  const [user, setUser] =
    useState<ReturnType<typeof AuthService.getUser>>(null);

  // 🔁 Pantau event login/logout dari AuthService
  useEffect(() => {
    setUser(AuthService.getUser());

    const updateUser = () => {
      setUser(AuthService.getUser());
    };

    // Dengarkan event global 'auth:changed' → dipicu saat login/logout
    window.addEventListener('auth:changed', updateUser);
    return () => window.removeEventListener('auth:changed', updateUser);
  }, []);

  /**
   * Handler ketika pengguna ingin login.
   * - Menyimpan `next_path` di `sessionStorage` untuk redirect setelah login.
   */
  const handleLogin = () => {
    sessionStorage.setItem('next_path', window.location.pathname);
    router.push('/login');
  };

  /**
   * Handler logout user.
   * - Menghapus data sesi via `AuthService.logout()`
   * - Redirect ke halaman utama.
   */
  const handleLogout = () => {
    AuthService.logout();
    router.push('/');
  };

  /**
   * Handler saat user memilih "Detail Profil".
   * - Fitur profil belum tersedia, hanya menampilkan alert sementara.
   */
  const handleProfile = () => {
    alert('Fitur profil belum tersedia.');
  };

  return (
    <header className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-2 shadow-sm dark:bg-slate-800">
      {/* 🔷 Logo Aplikasi */}
      <CustomLink href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center space-x-2">
          <div className="rounded-md border border-indigo-300 bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700 shadow-sm dark:border-indigo-500 dark:bg-indigo-900 dark:text-indigo-100">
            🚀 MX-Core
          </div>
        </div>
      </CustomLink>

      {/* 🌐 Navigasi Kanan: User Info + Theme */}
      <div className="flex items-center gap-4">
        <UserInfo
          isLoggedIn={!!user}
          username={user?.username ?? 'Guest'}
          avatarUrl={user?.avatarUrl}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onProfile={handleProfile}
        />
        <ThemeToggle />
      </div>
    </header>
  );
}
