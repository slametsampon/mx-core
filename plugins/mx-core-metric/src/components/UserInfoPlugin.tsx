// plugins/mx-core-metric/src/components/UserInfoPlugin.tsx

/**
 * @file UserInfoPlugin.tsx
 * @description
 * Komponen UI untuk menampilkan informasi user yang sedang login dalam plugin `mx-core-metric`.
 *
 * Menampilkan avatar, username, dan menu dropdown dengan role serta informasi plugin.
 * Data user diperoleh dari `AuthContext`, yang sebelumnya diisi oleh `AuthMessageListener` melalui `postMessage` dari host.
 *
 * 📦 Dipakai oleh:
 * - `Header.tsx` di dalam plugin
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import plugin from '../../plugin.json';

/**
 * Komponen UI user info (avatar + nama) untuk plugin.
 * Menampilkan:
 * - Username dan avatar (jika ada)
 * - Role user (Operator, Guest, dst.)
 * - Informasi plugin (name & version dari `plugin.json`)
 *
 * Menggunakan dropdown yang bisa toggle dan auto-close jika klik di luar area.
 *
 * @returns {JSX.Element} Komponen informasi user (dropdown panel)
 */
export default function UserInfoPlugin() {
  const user = useAuthContext(); // Ambil user dari context plugin
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const username = user?.username || 'Guest';
  const avatarUrl = user?.avatarUrl;
  const role = user?.role || 'guest';

  // 🛡️ Tutup dropdown saat klik di luar area
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        className="flex items-center gap-2 rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {/* Avatar */}
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
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600">
            {username[0]?.toUpperCase() ?? '?'}
          </div>
        )}

        {/* Username */}
        <span className="max-w-[10rem] truncate text-sm font-medium text-slate-700 dark:text-white">
          {username}
        </span>

        {/* Dropdown icon */}
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

      {/* Dropdown Content */}
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-52 rounded-lg border bg-white py-2 shadow-lg dark:border-gray-600 dark:bg-gray-800">
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-white">
            <div>
              <strong>Role:</strong> {role}
            </div>
            <div>
              <strong>Plugin:</strong> {plugin.name}
            </div>
            <div>
              <strong>Versi:</strong> {plugin.version}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
