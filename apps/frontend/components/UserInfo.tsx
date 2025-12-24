// apps/frontend/components/UserInfo.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';

interface UserInfoProps {
  isLoggedIn: boolean;
  username?: string;
  avatarUrl?: string;
  onLogin?: () => void;
  onLogout?: () => void;
  onProfile?: () => void;
}

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
      {/* Trigger */}
      <button
        className="flex items-center gap-2 rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
      >
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
        <span className="max-w-[10rem] truncate text-sm font-medium text-slate-700 dark:text-white">
          {username}
        </span>
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

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  close();
                  onProfile?.();
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
              >
                Detail Profil
              </button>
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
