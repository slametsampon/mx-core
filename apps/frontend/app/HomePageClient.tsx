// apps/frontend/app/HomePageClient.tsx

'use client';

import { useEffect, useState } from 'react';
import { CanAccess } from '@mx-core/ui/components/CanAccess';
import type { UserRole } from '@mx-core/types';
import { PluginCard } from '@/components/PluginCard';

interface PluginMeta {
  name: string;
  basePath: string;
  description: string;
  emoji?: string;
  [key: string]: any;
}

const currentRole: UserRole = 'Foreman';
const BASE_PATH = process.env.BASE_PATH ?? '';

export default function HomePageClient() {
  const [plugins, setPlugins] = useState<PluginMeta[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const manifestPath = `${BASE_PATH}/plugin-manifest.json`;

    async function fetchManifest() {
      try {
        const res = await fetch(manifestPath);
        if (!res.ok)
          throw new Error(`Failed to fetch manifest (${res.status})`);

        const raw = await res.json();

        // Validasi dan filter plugin
        const validated = Array.isArray(raw)
          ? raw.filter(isValidPluginMeta)
          : [];

        if (validated.length === 0) {
          throw new Error('No valid plugin entries found');
        }

        // Simpan ke localStorage sebagai fallback
        localStorage.setItem(
          'plugin-manifest-cache',
          JSON.stringify(validated)
        );
        setPlugins(validated);
      } catch (err: any) {
        console.error('Plugin manifest error:', err.message);

        // Fallback dari localStorage
        const cached = localStorage.getItem('plugin-manifest-cache');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            const valid = Array.isArray(parsed)
              ? parsed.filter(isValidPluginMeta)
              : [];
            setPlugins(valid);
          } catch {
            setError('Plugin manifest corrupt and fallback failed.');
          }
        } else {
          setError('Gagal memuat plugin dan tidak ada fallback.');
        }
      }
    }

    fetchManifest();
  }, []);

  function isValidPluginMeta(obj: any): obj is PluginMeta {
    return (
      typeof obj === 'object' &&
      typeof obj.name === 'string' &&
      typeof obj.basePath === 'string' &&
      typeof obj.description === 'string'
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      {/* 🔰 HERO */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          🔧 <span className="text-indigo-600">Mx-Core</span> Platform
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Industrial Plugin-based Platform untuk{' '}
          <span className="font-semibold italic text-indigo-600">Metric</span>,{' '}
          <span className="font-semibold italic text-blue-700">Docs</span>,{' '}
          <span className="font-semibold italic text-emerald-600">CMMS</span>,{' '}
          <span className="font-semibold italic text-purple-600">RBM</span>, dan{' '}
          <span className="font-semibold italic text-pink-600">AI</span>.
        </p>
      </section>

      {/* ⚠️ ERROR */}
      {error && (
        <div className="mb-6 rounded bg-red-100 p-4 text-sm text-red-800">
          ⚠️ {error}
        </div>
      )}

      {/* 🔌 PLUGINS */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">🧩 Plugin Tersedia</h2>
        <div className="space-y-3">
          {plugins.length === 0 && !error && (
            <p className="text-gray-500">
              Belum ada plugin UI yang terdeteksi.
            </p>
          )}

          {plugins.map((plugin) => (
            <PluginCard
              key={plugin.name}
              name={plugin.name}
              emoji={plugin.emoji}
              description={plugin.description}
              href={plugin.basePath}
              version={plugin.version}
              active={plugin.active}
            />
          ))}
        </div>
      </section>

      {/* 🔐 RBAC */}
      <section>
        <h2 className="mb-2 text-2xl font-semibold">
          🔐 Akses Berdasarkan Role
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          Role aktif: <strong>{currentRole}</strong>
        </p>

        <CanAccess role={currentRole} resource="metric" action="assign">
          <div className="rounded bg-green-100 p-4 shadow">
            <h3 className="text-lg font-bold">Assign KPI Metrics</h3>
            <p className="text-sm text-gray-700">
              Hanya untuk role berwenang (Foreman).
            </p>
          </div>
        </CanAccess>
      </section>
    </main>
  );
}
