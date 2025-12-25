// plugins/mx-core-metric/src/components/AuthMessageListener.tsx

'use client';

import { useEffect } from 'react';
import { useAuthSetter } from '@/context/AuthContext';

// Ganti origin sesuai host utama saat produksi
const ALLOWED_ORIGINS = ['http://localhost:3000', 'https://mx-core.vercel.app'];

export default function AuthMessageListener() {
  const setUser = useAuthSetter();

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      // 💡 Validasi asal domain
      if (!ALLOWED_ORIGINS.includes(event.origin)) return;

      const { type, user } = event.data || {};

      if (type === 'auth' && user?.username) {
        setUser(user); // ✅ Set ke context
      }

      // 🔐 Tambahan: Reset jika logout
      if (type === 'logout') {
        setUser(null);
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [setUser]);

  return null; // Komponen tidak render apa-apa
}
