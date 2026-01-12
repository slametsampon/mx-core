// plugins/mx-core-cmms/src/app/layout.tsx

import type { Metadata } from 'next';
import '@/css/tailwind.css';
import siteMetadata from '@/data/siteMetadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="favicon.ico" type="image/x-icon" sizes="any" />
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
      </body>
    </html>
  );
}
