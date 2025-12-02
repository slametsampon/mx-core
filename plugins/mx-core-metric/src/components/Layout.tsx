// plugins/mx-core-metric/src/components/Layout.tsx

'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function MetricLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Navbar */}
      <header className="w-full bg-gray-100 px-6 py-4 shadow dark:bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">📊 Metric Plugin</h1>
          <nav className="space-x-4 text-sm font-medium">
            <Link href="/" className="hover:underline">
              Beranda
            </Link>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Metricube Plugin. All rights reserved.
      </footer>
    </div>
  );
}
