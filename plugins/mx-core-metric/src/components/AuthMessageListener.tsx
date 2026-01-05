// plugins/mx-core-metric/src/components/AuthMessageListener.tsx

/**
 * @file AuthMessageListener.tsx
 * @description
 * Komponen React non-visual (headless) yang mendengarkan pesan `postMessage`
 * dari aplikasi host (misalnya: frontend utama di port 3000 atau domain Vercel).
 *
 * Komponen ini digunakan oleh plugin (contohnya: `mx-core-metric`) untuk
 * menerima informasi autentikasi (`auth`) atau sinyal logout dari host.
 *
 * 🔒 Keamanan: hanya menerima pesan dari origin yang ditentukan (`ALLOWED_ORIGINS`).
 * 🔄 Integrasi: bekerja bersama dengan AuthContext (via `useAuthSetter`) untuk menyimpan user.
 *
 * 📦 Dimasukkan ke layout atau root provider plugin untuk mendukung autentikasi iframe.
 */

'use client';

import { useEffect } from 'react';
import { useAuthSetter } from '@/context/AuthContext';

/**
 * Daftar origin yang diizinkan untuk mengirim postMessage ke plugin ini.
 * Harus sesuai dengan domain frontend utama (misal: localhost:3000 atau domain produksi).
 */
const ALLOWED_ORIGINS = [
  'http://localhost:3000', // ✅ untuk development lokal
  'https://mx-core.vercel.app', // ✅ domain produksi (sesuaikan jika berubah)
];

/**
 * Komponen React yang mendengarkan event `message` (postMessage) dari window.
 * Menerima pesan `auth` (untuk login) dan `logout` (untuk keluar).
 *
 * Tidak merender UI apapun (return `null`) dan hanya bekerja sebagai listener.
 *
 * @component
 */
export default function AuthMessageListener() {
  // Setter dari context untuk mengubah nilai user global
  const setUser = useAuthSetter();

  useEffect(() => {
    /**
     * Handler utama untuk menangani pesan masuk via window.postMessage
     *
     * @param {MessageEvent} event - event dari postMessage
     */
    const handler = (event: MessageEvent) => {
      // ✅ Filter asal domain (untuk keamanan)
      if (!ALLOWED_ORIGINS.includes(event.origin)) return;

      const { type, user } = event.data || {};

      // ✅ Jika pesan bertipe 'auth', set user
      if (type === 'auth' && user?.username) {
        setUser(user);
      }

      // 🧹 Jika pesan bertipe 'logout', hapus user
      if (type === 'logout') {
        setUser(null);
      }
    };

    // 🚀 Pasang event listener saat mount
    window.addEventListener('message', handler);

    // 🧼 Bersihkan saat unmount
    return () => window.removeEventListener('message', handler);
  }, [setUser]);

  return null; // 🔇 Komponen ini tidak menampilkan UI
}
