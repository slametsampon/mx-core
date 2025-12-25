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
 * - Jika menerima event.type === 'auth', update user context
 * - Menyediakan AuthContext ke seluruh plugin
 */
export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<AuthContextUser | null>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // 🎯 Filter hanya pesan auth
      if (!event.data || event.data.type !== 'auth') return;

      // 🛡️ TODO (nanti): validate event.origin
      const userData = event.data.user;
      if (userData && typeof userData.username === 'string') {
        setUser(userData);
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
