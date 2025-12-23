// apps/frontend/components/PluginCard.tsx

'use client';

import React from 'react';

interface PluginCardProps {
  name: string;
  emoji?: string;
  description: string;
  href: string;
  version?: string;
  active?: boolean;
}

export const PluginCard: React.FC<PluginCardProps> = ({
  name,
  emoji = '📦',
  description,
  href,
  version,
  active = true,
}) => {
  return (
    <a
      href={href}
      className={`block rounded border p-4 transition ${
        active
          ? 'border-gray-200 bg-white shadow-sm hover:bg-gray-50'
          : 'pointer-events-none cursor-not-allowed border-gray-300 bg-gray-50 opacity-70'
      }`}
    >
      {/* HEADER */}
      <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
        <span>{emoji}</span>
        {name}
        {version && (
          <span className="ml-2 text-xs font-normal text-gray-400">
            v{version}
          </span>
        )}
      </h3>

      {/* DESKRIPSI */}
      <p className="text-sm text-gray-600">{description}</p>

      {/* STATUS */}
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
    </a>
  );
};
