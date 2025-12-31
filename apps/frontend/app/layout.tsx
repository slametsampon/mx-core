// apps/frontend/app/layout.tsx

import siteMetadata from '@/data/siteMetadata';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
      </head>
      <body className="antialiased">
        <Header /> {/* ✅ Header akan jadi full width */}
        {children}
        <Footer /> {/* ✅ Footer juga full width */}
        {/* ✅ Tambahkan ini untuk mengaktifkan semua toast */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: '14px',
              padding: '10px 16px',
            },
          }}
        />{' '}
      </body>
    </html>
  );
}
