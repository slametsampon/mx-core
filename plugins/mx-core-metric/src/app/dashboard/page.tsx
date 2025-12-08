// plugins/mx-core-metric/src/app/dashboard/page.tsx

'use client'; // ⬅️ WAJIB untuk gunakan state dan effect

import { useEffect, useState } from 'react';
import { fetchView } from '@/services/viewService';
import { DynamicViewTable } from '@/components/DynamicViewTable';
import { ViewSelector } from '@/components/ViewSelector';
import { FilterControls } from '@/components/FilterControls';
import { viewDefinitions, ViewKey } from '@/config/viewDefinitions';

// import KPIChart from '@/components/KPIChart';
// import DisturbanceChart from '@/components/DisturbanceChart';
// import KPIOverview from '@/components/KPIOverview';
// import DisturbanceInsight from '@/components/DisturbanceInsight';

export default function DashboardPage() {
  const [view, setView] = useState<ViewKey>('v_department_kpi_target');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchView(view, filters)
      .then(setRows)
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [view, filters]);

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">📊 KPI Dashboard</h1>

      {/* <KPIChart />
      <DisturbanceChart />
      <KPIOverview />
      <DisturbanceInsight /> */}

      <ViewSelector
        current={view}
        onChange={(next) => {
          setView(next);
          setFilters({});
        }}
      />

      <FilterControls view={view} filters={filters} onChange={setFilters} />
      <DynamicViewTable view="v_department_kpi_target" items={rows} />
    </main>
  );
}
