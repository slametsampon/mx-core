// plugins/mx-core-metric/src/context/AuthContextProvider.tsx

'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AuthContext, type AuthContextUser } from './AuthContext';

interface Props {
  children: ReactNode;
}

/**
 * AuthContextProvider
 *
 * - Menunggu pesan dari parent (frontend host) via postMessage
 * - Jika tidak ada pesan, fallback baca dari localStorage (untuk tab baru)
 * - Menyediakan AuthContext ke seluruh plugin
 */
export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<AuthContextUser | null>(null);

  useEffect(() => {
    let messageReceived = false;

    function handleMessage(event: MessageEvent) {
      if (!event.data || event.data.type !== 'auth') return;

      // ✅ Terima postMessage
      const userData = event.data.user;
      if (userData && typeof userData.username === 'string') {
        messageReceived = true;
        setUser(userData);
        // Simpan ke localStorage sebagai fallback untuk tab baru selanjutnya
        try {
          localStorage.setItem('plugin_user_cache', JSON.stringify(userData));
        } catch (err) {
          console.error('Unexpected error:', err);
        }
      }
    }

    // Dengarkan pesan dari host
    window.addEventListener('message', handleMessage);

    // ⏱️ Fallback jika tidak ada pesan masuk dalam 500ms
    const fallbackTimeout = setTimeout(() => {
      if (!messageReceived) {
        try {
          const cached = localStorage.getItem('plugin_user_cache');
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed?.username && parsed?.role) {
              setUser(parsed);
              console.warn(
                '[AuthContext] Fallback to localStorage (plugin_user_cache)'
              );
            }
          }
        } catch (err) {
          console.warn(
            '[AuthContext] Failed to parse fallback from localStorage',
            err
          );
        }
      }
    }, 500);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
