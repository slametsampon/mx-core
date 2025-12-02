// plugins/mx-core-metric/src/app/layout.tsx

import type { Metadata } from 'next';
import '@/css/tailwind.css';
import MetricLayout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Plugin Metric',
  description: 'Halaman plugin metric untuk monitoring KPI dan disturbance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased">
        <MetricLayout>{children}</MetricLayout>
      </body>
    </html>
  );
}
