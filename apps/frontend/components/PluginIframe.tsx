// apps/frontend/components/PluginIframe.tsx

'use client';

import { useEffect, useRef } from 'react';
import { AuthService } from '@/services/auth-service';

interface PluginIframeProps {
  src: string;
  title?: string;
  className?: string;
}

export default function PluginIframe({
  src,
  title = 'Plugin',
  className = 'w-full h-[80vh] border rounded-md',
}: PluginIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const user = AuthService.getUser();

    function sendAuth() {
      if (!iframeRef.current?.contentWindow || !user) return;

      iframeRef.current.contentWindow.postMessage(
        {
          type: 'auth',
          user,
        },
        '*'
      );
    }

    // 🔁 Kirim pesan setelah iframe dimuat
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', sendAuth);
    }

    // 🔄 Kirim ulang jika user berubah (opsional)
    const handleAuthChanged = () => {
      sendAuth();
    };
    window.addEventListener('auth:changed', handleAuthChanged);

    return () => {
      iframe?.removeEventListener('load', sendAuth);
      window.removeEventListener('auth:changed', handleAuthChanged);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      className={className}
      allow="clipboard-write"
    />
  );
}
