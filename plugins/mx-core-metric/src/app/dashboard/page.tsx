// plugins/mx-core-metric/src/app/dashboard/page.tsx

'use client'; // ⬅️ WAJIB untuk gunakan state dan effect

import { useEffect, useState } from 'react';
import { fetchView } from '@/services/viewService';
import { DynamicViewTable } from '@/components/DynamicViewTable';
import KPIChart from '@/components/KPIChart';
import DisturbanceChart from '@/components/DisturbanceChart';
import KPIOverview from '@/components/KPIOverview';
import DisturbanceInsight from '@/components/DisturbanceInsight';

export default function DashboardPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchView('v_department_kpi_target').then(setRows);
  }, []);

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">📊 KPI Dashboard</h1>

      <KPIChart />
      <DisturbanceChart />
      <KPIOverview />
      <DisturbanceInsight />

      <DynamicViewTable view="v_department_kpi_target" items={rows} />
    </main>
  );
}
