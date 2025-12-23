// apps/frontend/app/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { CanAccess } from '@mx-core/ui/components/CanAccess';
import type { UserRole } from '@mx-core/types';

interface PluginMeta {
  name: string;
  basePath: string;
  description: string;
  emoji?: string; // ✨ Tambahkan field emoji opsional
  [key: string]: any;
}

const currentRole: UserRole = 'Foreman'; // TODO: Ganti dengan context auth dinamis jika tersedia
const BASE_PATH = process.env.BASE_PATH ?? '';

export const metadata = {
  title: 'Beranda | Frontend',
  description: 'Mx Core Frontend - Entry point untuk Mx-Core System',
};

export default function HomePage() {
  const [plugins, setPlugins] = useState<PluginMeta[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const manifestPath = `${BASE_PATH}/plugin-manifest.json`;

    fetch(manifestPath)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`❌ Failed to fetch manifest (${res.status})`);
        }
        return res.json();
      })
      .then((data) => setPlugins(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      {/* 🔰 HERO SECTION */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          🔧 <span className="text-indigo-600">MX-Core</span> Platform
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Industrial Plugin-based Platform untuk{' '}
          <span className="font-semibold italic text-indigo-600">Metric</span>,{' '}
          <span className="font-semibold italic text-blue-700">Docs</span>,{' '}
          <span className="font-semibold italic text-emerald-600">CMMS</span>,{' '}
          <span className="font-semibold italic text-purple-600">RBM</span>, dan{' '}
          <span className="font-semibold italic text-pink-600">AI</span>. Bangun
          solusi digital secara modular dan aman menggunakan plugin yang dapat
          dikembangkan secara terpisah.
        </p>
      </section>

      {/* ⚠️ ERROR LOADING */}
      {error && (
        <div className="mb-6 rounded bg-red-100 p-4 text-sm text-red-800">
          ⚠️ {error}
        </div>
      )}

      {/* 🔌 PLUGIN SECTION */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">🧩 Plugin Tersedia</h2>
        <div className="space-y-3">
          {plugins.length === 0 && !error && (
            <p className="text-gray-500">
              Belum ada plugin UI yang terdeteksi.
            </p>
          )}
          {plugins.map((plugin) => (
            <a
              key={plugin.name}
              href={plugin.basePath}
              className="block rounded border p-4 transition hover:bg-gray-50"
            >
              <h3 className="flex items-center gap-2 text-xl font-semibold">
                <span>{plugin.emoji ?? '📦'}</span> {/* ✅ fallback emoji */}
                {plugin.name}
              </h3>
              <p className="text-sm text-gray-600">{plugin.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 🔐 RBAC SECTION */}
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">
          🔐 Akses Berdasarkan Role
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          Komponen di bawah hanya akan ditampilkan jika role Anda memiliki akses
          yang sesuai. Saat ini role aktif: <strong>{currentRole}</strong>
        </p>

        <CanAccess role={currentRole} resource="metric" action="assign">
          <div className="rounded bg-green-100 p-4 shadow">
            <h3 className="text-lg font-bold">Assign KPI Metrics</h3>
            <p className="text-sm text-gray-700">
              Komponen ini hanya bisa diakses oleh role yang berhak, seperti{' '}
              <code>Foreman</code>.
            </p>
          </div>
        </CanAccess>
      </section>
    </main>
  );
}
