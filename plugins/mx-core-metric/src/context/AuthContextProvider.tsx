// plugins/mx-core-metric/src/context/AuthContextProvider.tsx

/**
 * @file AuthContextProvider.tsx
 * @description
 * Komponen global provider untuk plugin `mx-core-metric` yang mengelola dan menyuntikkan context user (`AuthContext`).
 *
 * Menerima data user dari `postMessage` (utama), dan fallback ke session API jika diperlukan.
 * Juga menangani validasi role dan error sesi untuk keamanan plugin.
 */

'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AuthContext, type AuthContextUser } from './AuthContext';

interface Props {
  children: ReactNode;
}

/**
 * Komponen provider untuk menyuntikkan user login ke dalam context (`AuthContext`).
 * Digunakan di root plugin `mx-core-metric` untuk memastikan plugin mengetahui siapa user yang login.
 *
 * Mendukung dua strategi autentikasi:
 * 1. **postMessage (utama):** Menerima data user dari iframe host (frontend).
 * 2. **Fallback:** Jika `postMessage` gagal (misal reload langsung), maka baca session ID dari URL dan fetch ke `/api/session`.
 *
 * Validasi dilakukan terhadap role user (`Operator`) agar sesuai dengan role plugin.
 *
 * Jika sesi tidak valid atau tidak sesuai, akan ditampilkan pesan error yang bersifat blocking (tidak render children).
 */
export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<AuthContextUser | null>(null);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    let messageReceived = false;

    /**
     * Handler untuk menerima postMessage dari host (frontend).
     * Akan mengisi context user dan menyimpan ke localStorage sebagai cache.
     * Jika menerima `type: 'logout'`, maka hapus cache dan reset context.
     */
    function handleMessage(event: MessageEvent) {
      if (event.data.type === 'logout') {
        localStorage.removeItem('plugin_user_cache');
        setUser(null);
      }

      if (!event.data || event.data.type !== 'auth') return;

      const userData = event.data.user;
      if (userData && typeof userData.username === 'string') {
        messageReceived = true;
        setUser(userData);
        try {
          localStorage.setItem('plugin_user_cache', JSON.stringify(userData));
        } catch (err) {
          console.error('Unexpected error storing cache:', err);
        }
      }
    }

    window.addEventListener('message', handleMessage);

    /**
     * Jika tidak menerima postMessage dalam waktu 500ms,
     * maka fallback ke session API dengan membaca `?session=` dari URL.
     */
    const fallbackTimeout = setTimeout(async () => {
      if (messageReceived) return;

      const sessionId = getSessionIdFromURL();
      const pluginScope = 'mx-core-metric';

      if (!sessionId) {
        setSessionError(
          'Tidak ada sesi aktif. Silakan login ulang melalui host.'
        );
        return;
      }

      try {
        const res = await fetch(
          `/api/session/${sessionId}?scope=${pluginScope}`
        );

        if (res.status === 401 || res.status === 410) {
          setSessionError(
            'Sesi Anda telah kedaluwarsa. Silakan tutup plugin dan login ulang.'
          );
          return;
        }

        if (!res.ok) throw new Error(`Status ${res.status}`);

        const data = await res.json();
        if (data?.user?.username && data?.user?.role) {
          const expectedRole = 'Operator'; // 🔐 Role yang diizinkan untuk plugin ini

          if (data.user.role !== expectedRole) {
            setSessionError(
              'Sesi Anda tidak sesuai dengan role plugin. Silakan login ulang dengan akun yang benar.'
            );
            return;
          }

          setUser(data.user);
          console.warn('[AuthContext] Loaded from session API');
        }
      } catch (err) {
        console.error('[AuthContext] Failed to fetch session', err);
        setSessionError(
          'Terjadi kesalahan saat memuat sesi. Silakan tutup plugin dan coba lagi.'
        );
      }
    }, 500);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  // ⚠️ Render error jika sesi tidak valid
  if (sessionError) {
    return (
      <div className="rounded bg-red-100 p-4 text-sm text-red-800">
        ⚠️ {sessionError}
      </div>
    );
  }

  // ✅ Inject context user ke seluruh anak komponen
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

/**
 * Helper untuk mengambil session ID dari query string (?session=xxx)
 * @returns {string | null} sessionId jika valid, atau null
 */
function getSessionIdFromURL(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session');
  return sessionId && sessionId.length >= 10 ? sessionId : null;
}
