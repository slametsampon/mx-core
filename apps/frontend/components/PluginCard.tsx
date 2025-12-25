// apps/frontend/components/PluginCard.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';

interface PluginCardProps {
  name: string;
  emoji?: string;
  description: string;
  href: string;
  version?: string;
  active?: boolean;
  onOpenIframe?: () => void; // ⬅️ fungsi jika buka di halaman ini
}

export const PluginCard: React.FC<PluginCardProps> = ({
  name,
  emoji = '📦',
  description,
  href,
  version,
  active = true,
  onOpenIframe,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = () => setShowMenu((v) => !v);
  const close = () => setShowMenu(false);

  // tutup jika klik luar menu
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!menuRef.current || menuRef.current.contains(e.target as Node))
        return;
      close();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggle}
        className={`block w-full rounded border p-4 text-left transition ${
          active
            ? 'border-gray-200 bg-white shadow-sm hover:bg-gray-50'
            : 'pointer-events-none cursor-not-allowed border-gray-300 bg-gray-50 opacity-70'
        }`}
      >
        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <span>{emoji}</span>
          {name}
          {version && (
            <span className="ml-2 text-xs font-normal text-gray-400">
              v{version}
            </span>
          )}
        </h3>

        <p className="text-sm text-gray-600">{description}</p>

        <p className="mt-1 text-xs">
          Status:{' '}
          <span
            className={`font-semibold ${
              active ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {active ? 'Aktif' : 'Nonaktif'}
          </span>
        </p>
      </button>

      {/* MENU PILIHAN */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute right-2 top-full z-50 mt-2 w-48 rounded-md border bg-white shadow-lg"
        >
          <button
            onClick={() => {
              close();
              onOpenIframe?.();
            }}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            🧩 Buka di Halaman Ini
          </button>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-4 py-2 text-left text-sm text-blue-700 hover:bg-gray-100"
          >
            🔗 Buka Tab Baru
          </a>
        </div>
      )}
    </div>
  );
};
