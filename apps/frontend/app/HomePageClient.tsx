// apps/frontend/app/HomePageClient.tsx

'use client';

import { useEffect, useState } from 'react';
import { CanAccess } from '@mx-core/ui/components/CanAccess';
import { PluginMeta, UserBase, UserRole } from '@mx-core/types';
import { PluginCard } from '@/components/PluginCard';
import PluginIframe from '@/components/PluginIframe';
import { AuthService } from '@/services/auth-service';
import { createSession } from '@/services/session.service';

const BASE_PATH = process.env.BASE_PATH ?? '';

interface ActivePluginSession {
  plugin: PluginMeta;
  sessionId: string;
  iframeUrl: string;
}

export default function HomePageClient() {
  const [plugins, setPlugins] = useState<PluginMeta[]>([]);
  const [active, setActive] = useState<ActivePluginSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const manifestPath = `${BASE_PATH}/plugin-manifest.json`;

    async function fetchManifest() {
      try {
        const res = await fetch(manifestPath);
        if (!res.ok)
          throw new Error(`Failed to fetch manifest (${res.status})`);

        const raw = await res.json();
        const validated = Array.isArray(raw)
          ? raw.filter(isValidPluginMeta)
          : [];

        if (validated.length === 0)
          throw new Error('No valid plugin entries found');

        localStorage.setItem(
          'plugin-manifest-cache',
          JSON.stringify(validated)
        );
        setPlugins(validated);
      } catch (err: any) {
        console.error('Plugin manifest error:', err.message);
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

  const handleOpenPlugin = async (plugin: PluginMeta) => {
    try {
      const rawUser = AuthService.getUser();
      if (!rawUser) {
        setError('User belum login. Silakan login ulang.');
        return;
      }

      const user: UserBase = {
        username: rawUser.username,
        avatarUrl: rawUser.avatarUrl,
        role: rawUser.role ?? 'Guest',
      };

      const scope = plugin.basePath ?? plugin.name;
      const sessionId = await createSession(user, scope);

      localStorage.setItem('plugin_session_id', sessionId);

      const url = `${scope}?session=${sessionId}`;
      setActive({ plugin, sessionId, iframeUrl: url });

      // Kirim postMessage setelah iframe dimount
      setTimeout(() => {
        const iframe = document.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            {
              type: 'auth',
              user,
            },
            '*' // ✅ atau domain asal jika strict
          );
        }
      }, 300); // ⏱️ delay kecil untuk pastikan iframe siap

      // 🧹 Reset error jika berhasil
      setError(null);
    } catch (err: any) {
      console.error('Gagal membuka plugin:', err);
      setError(
        'Gagal membuka plugin. Coba lagi nanti atau hubungi admin jika error terus berulang.'
      );
    }
  };

  const [currentRole, setCurrentRole] = useState<UserRole>('Guest');

  useEffect(() => {
    const u = AuthService.getUser();
    if (u?.role) setCurrentRole(u.role);
  }, []);

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
              description={plugin.description ?? ''}
              href={plugin.basePath ?? '#'}
              version={plugin.version}
              active={plugin.active}
              onOpenIframe={() => handleOpenPlugin(plugin)}
            />
          ))}
        </div>
      </section>

      {/* 🧭 Plugin Frame Viewer */}
      {active && (
        <section className="mt-10">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              📦 Plugin Aktif: {active.plugin.name}
            </h2>
            <button
              onClick={() => setActive(null)}
              className="text-sm text-red-600 hover:underline"
            >
              ✖ Tutup Plugin
            </button>
          </div>

          <PluginIframe
            src={active.iframeUrl}
            title={active.plugin.name}
            className="h-[80vh] w-full rounded-md border"
          />
        </section>
      )}

      {/* 🔐 RBAC */}
      <section className="mt-16">
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
