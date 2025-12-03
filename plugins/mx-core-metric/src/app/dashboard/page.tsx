// plugins/mx-core-metric/src/app/dashboard/page.tsx

import React from 'react';
import KPIOverview from '@/components/KPIOverview';
import DisturbanceInsight from '@/components/DisturbanceInsight';
//import ForecastChart from '@/components/ForecastChart';

export const metadata = {
  title: 'Dashboard | Metricube',
  description: 'Halaman dashboard masih dalam pengembangan.',
};

export default function DashboardPage() {
  return (
    <main className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">📊 KPI Dashboard</h1>

      <KPIOverview />
      <DisturbanceInsight />
    </main>
  );
}
