// apps/frontend/components/Header.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import siteMetadata from '@/data/siteMetadata';
import CustomLink from './CustomLink';
import ThemeToggle from './ThemeToggle';
import UserInfo from './UserInfo';
import { AuthService } from '@/services/auth-service';

export default function Header() {
  const router = useRouter();
  const [user, setUser] =
    useState<ReturnType<typeof AuthService.getUser>>(null);

  useEffect(() => {
    // aman, hanya di client
    setUser(AuthService.getUser());

    const updateUser = () => {
      setUser(AuthService.getUser());
    };

    window.addEventListener('auth:changed', updateUser);
    return () => window.removeEventListener('auth:changed', updateUser);
  }, []);

  const handleLogin = () => {
    // Simpan current path untuk redirect setelah login
    sessionStorage.setItem('next_path', window.location.pathname);
    router.push('/login');
  };

  const handleLogout = () => {
    AuthService.logout();
    router.push('/');
  };

  const handleProfile = () => {
    alert('Fitur profil belum tersedia.');
  };

  return (
    <header className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-2 shadow-sm dark:bg-slate-800">
      {/* 🔷 LOGO */}
      <CustomLink href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center space-x-2">
          <div className="rounded-md border border-indigo-300 bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700 shadow-sm dark:border-indigo-500 dark:bg-indigo-900 dark:text-indigo-100">
            🚀 MX-Core
          </div>
        </div>
      </CustomLink>

      {/* 🌐 NAV & TOOLS */}
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
