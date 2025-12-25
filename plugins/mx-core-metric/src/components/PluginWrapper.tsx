// plugins/mx-core-metric/src/components/PluginWrapper.tsx

'use client';

import { useEffect, useState } from 'react';
import { AuthContext, AuthContextUser } from '../context/AuthContext';

interface PluginWrapperProps {
  children: React.ReactNode;
}

export default function PluginWrapper({ children }: PluginWrapperProps) {
  const [user, setUser] = useState<AuthContextUser | null>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'auth' && e.data?.user) {
        setUser(e.data.user);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
