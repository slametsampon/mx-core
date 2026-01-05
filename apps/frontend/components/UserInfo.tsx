// apps/frontend/components/UserInfo.tsx

/**
 * @file UserInfo.tsx
 * @description Komponen UI dropdown akun user (avatar + nama), dengan menu untuk login, logout, dan profil.
 *              Dapat digunakan di header atau sidebar.
 *
 * 🔗 Hubungan:
 * - Mengandalkan status login (`isLoggedIn`) dan data user dari parent.
 * - Callback `onLogin`, `onLogout`, `onProfile` biasanya terhubung ke:
 *   - `AuthService.logout()` → menghapus session dan localStorage.
 *   - Navigasi ke halaman login / profil.
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * Props yang diterima oleh komponen `UserInfo`.
 */
interface UserInfoProps {
  /**
   * Status login user saat ini.
   */
  isLoggedIn: boolean;

  /**
   * Username untuk ditampilkan (default: `'Guest'`).
   */
  username?: string;

  /**
   * URL avatar user (jika ada).
   */
  avatarUrl?: string;

  /**
   * Callback saat pengguna memilih "Login".
   */
  onLogin?: () => void;

  /**
   * Callback saat pengguna memilih "Logout".
   */
  onLogout?: () => void;

  /**
   * Callback saat pengguna memilih "Detail Profil".
   */
  onProfile?: () => void;
}

/**
 * Komponen dropdown identitas pengguna (avatar + nama) dengan menu aksi:
 * - Jika user login → Tampilkan opsi **Profil** dan **Logout**.
 * - Jika belum login → Tampilkan opsi **Login**.
 *
 * Komponen ini tidak menyimpan state autentikasi, hanya presentasional.
 *
 * @component
 * @example
 * <UserInfo
 *   isLoggedIn={true}
 *   username="operator01"
 *   avatarUrl="/avatars/op1.png"
 *   onLogout={() => AuthService.logout()}
 *   onProfile={() => router.push('/profile')}
 * />
 */
export default function UserInfo({
  isLoggedIn,
  username = 'Guest',
  avatarUrl,
  onLogin,
  onLogout,
  onProfile,
}: UserInfoProps) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <div className="relative">
      {/* Trigger dropdown */}
      <button
        className="flex items-center gap-2 rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {/* Avatar / fallback icon */}
        {avatarUrl ? (
          <div className="h-8 w-8 overflow-hidden rounded-full border">
            <Image
              src={avatarUrl}
              alt="Avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-sm dark:bg-gray-600">
            ?
          </div>
        )}

        {/* Username */}
        <span className="max-w-[10rem] truncate text-sm font-medium text-slate-700 dark:text-white">
          {username}
        </span>

        {/* Chevron icon */}
        <svg
          className="h-4 w-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
          {isLoggedIn ? (
            <>
              {/* Detail Profil */}
              <button
                onClick={() => {
                  close();
                  onProfile?.();
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
              >
                Detail Profil
              </button>

              {/* Logout */}
              <button
                onClick={() => {
                  close();
                  onLogout?.();
                }}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            // Jika belum login
            <button
              onClick={() => {
                close();
                onLogin?.();
              }}
              className="w-full px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
            >
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
}
