// apps/frontend/components/PluginIframe.tsx

/**
 * @file PluginIframe.tsx
 * @description
 * Komponen iframe dinamis untuk menampilkan plugin dari URL eksternal (scoped),
 * dan mengirimkan `postMessage` berisi data user login ke plugin begitu iframe siap.
 *
 * 🔗 Hubungan erat dengan:
 * - `AuthService` → Mengambil user login untuk dikirim ke plugin.
 * - `auth:changed` event → Mengirim ulang data user saat user login/logout berubah.
 * - HomePageClient.tsx → Komponen induk yang mengatur URL dan sesi plugin.
 */

'use client';

import { useEffect, useRef } from 'react';
import { AuthService } from '@/services/auth-service';

interface PluginIframeProps {
  /** URL lengkap plugin (termasuk session ID) */
  src: string;
  /** Judul iframe (untuk accessibility) */
  title?: string;
  /** Kelas CSS opsional untuk styling iframe */
  className?: string;
}

/**
 * `PluginIframe` adalah wrapper `iframe` yang otomatis mengirim
 * pesan `postMessage` kepada plugin setelah iframe selesai dimuat.
 *
 * @component
 * @param {PluginIframeProps} props - Properti komponen.
 * @returns JSX.Element
 *
 * @example
 * ```tsx
 * <PluginIframe
 *   src="/plugins/metric?session=abc123"
 *   title="Metric Plugin"
 *   className="h-[80vh] w-full border"
 * />
 * ```
 */
export default function PluginIframe({
  src,
  title = 'Plugin',
  className = 'w-full h-[80vh] border rounded-md',
}: PluginIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const user = AuthService.getUser();

    /**
     * Kirim pesan autentikasi ke iframe target.
     * Menggunakan postMessage agar plugin bisa mengidentifikasi user.
     */
    function sendAuth() {
      if (!iframeRef.current?.contentWindow || !user) return;

      iframeRef.current.contentWindow.postMessage(
        {
          type: 'auth',
          user,
        },
        '*' // Gunakan origin ketat jika diperlukan untuk security
      );
    }

    // 🔁 Kirim pesan saat iframe selesai dimuat
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', sendAuth);
    }

    // 🔄 Jika user login/logout → kirim ulang ke iframe
    const handleAuthChanged = () => {
      sendAuth();
    };

    window.addEventListener('auth:changed', handleAuthChanged);

    // 🧹 Cleanup saat komponen unmount
    return () => {
      iframe?.removeEventListener('load', sendAuth);
      window.removeEventListener('auth:changed', handleAuthChanged);
    };
  }, []);

  return (
    <iframe
      onLoad={() => {
        // ⛔ Backup tambahan jika iframeRef gagal
        const user = AuthService.getUser();
        const iframe = document.querySelector('iframe');
        iframe?.contentWindow?.postMessage({ type: 'auth', user }, '*');
      }}
      ref={iframeRef}
      src={src}
      title={title}
      className={className}
      allow="clipboard-write" // diperlukan jika plugin perlu akses clipboard
    />
  );
}
