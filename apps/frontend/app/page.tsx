// apps/frontend/app/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { CanAccess } from '@mx-core/ui/components/CanAccess';
import type { UserRole } from '@mx-core/types';

interface PluginMeta {
  name: string;
  basePath: string;
  description: string;
  [key: string]: any;
}

const currentRole: UserRole = 'Foreman'; // TODO: Ganti dengan context auth dinamis jika tersedia
const BASE_PATH = process.env.BASE_PATH ?? '';

export default function HomePage() {
  const [plugins, setPlugins] = useState<PluginMeta[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const manifestPath = `${BASE_PATH}/plugin-manifest.json`;

    console.log('📦 Loading plugin manifest...');
    console.log('🔍 BASE_PATH:', BASE_PATH);
    console.log('🔗 Final fetch URL:', manifestPath);

    fetch(manifestPath)
      .then((res) => {
        console.log('📡 Fetch status:', res.status);
        if (!res.ok) {
          throw new Error(
            `❌ Failed to fetch manifest (${res.status}) from ${manifestPath}`
          );
        }
        return res.json();
      })
      .then((data) => {
        console.log('✅ Plugin manifest loaded:', data);
        setPlugins(data);
      })
      .catch((err) => {
        console.error('🚨 Error loading plugin manifest:', err.message);
        setError(err.message);
      });
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      {/* 🔰 HERO SECTION */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          🔧 MX-Core Platform
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Industrial Plugin-based Platform untuk Metric, Docs, CMMS, RBM, dan
          AI. Bangun solusi digital secara modular dan aman menggunakan plugin
          yang dapat dikembangkan secara terpisah.
        </p>
      </section>

      {/* ⚠️ ERROR LOADING PLUGIN MANIFEST */}
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
              href={`${BASE_PATH}${plugin.basePath}`}
              className="block rounded border p-4 transition hover:bg-gray-50"
            >
              <h3 className="text-xl font-semibold">{plugin.name}</h3>
              <p className="text-sm text-gray-600">{plugin.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 🔐 RBAC-AWARE SECTION */}
      <section className="mb-10">
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

      {/* 🚀 CTA SECTION */}
      <section className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
        Powered by <strong>MX-Core</strong> • Modular Digital Ecosystem for
        Industry
      </section>
    </main>
  );
}
