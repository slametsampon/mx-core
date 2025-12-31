// plugins/mx-core-metric/src/context/AuthContextProvider.tsx

'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AuthContext, type AuthContextUser } from './AuthContext';

interface Props {
  children: ReactNode;
}

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<AuthContextUser | null>(null);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    let messageReceived = false;

    // === 1️⃣ POSTMESSAGE (utama) ===
    function handleMessage(event: MessageEvent) {
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

    // === 2️⃣ FALLBACK: Tunggu 500ms, lalu cek localStorage & session API ===
    const fallbackTimeout = setTimeout(async () => {
      if (messageReceived) return;

      try {
        const cached = localStorage.getItem('plugin_user_cache');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.username && parsed?.role) {
            setUser(parsed);
            console.warn('[AuthContext] Fallback to localStorage');
            return;
          }
        }
      } catch (err) {
        console.warn('[AuthContext] Failed parsing plugin_user_cache', err);
      }

      // === 3️⃣ Fallback terakhir: Coba ambil dari ?session=
      const sessionId = getSessionIdFromURL();
      const pluginScope = 'mx-core-metric';

      if (sessionId) {
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
            setUser(data.user);
            localStorage.setItem(
              'plugin_user_cache',
              JSON.stringify(data.user)
            );
            console.warn('[AuthContext] Loaded from session API');
          }
        } catch (err) {
          console.error('[AuthContext] Failed to fetch session', err);
          setSessionError(
            'Terjadi kesalahan saat memuat sesi. Silakan tutup plugin dan coba lagi.'
          );
        }
      }
    }, 500);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  if (sessionError) {
    return (
      <div className="rounded bg-red-100 p-4 text-sm text-red-800">
        ⚠️ {sessionError}
      </div>
    );
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function getSessionIdFromURL(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session');
  return sessionId && sessionId.length >= 10 ? sessionId : null;
}
