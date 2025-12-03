// plugins/mx-core-metric/src/components/KPIOverview.tsx

'use client';

import { useKpiData } from '@/hooks/useKpiData';

export default function KPIOverview() {
  const { data, loading, error } = useKpiData();

  if (loading) return <p>Loading KPI...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data) return <p>No KPI data.</p>;

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">📈 KPI Overview</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Periode</th>
            <th className="border px-2 py-1">KPI ID</th>
            <th className="border px-2 py-1">Value</th>
            <th className="border px-2 py-1">Source</th>
          </tr>
        </thead>
        <tbody>
          {data.map((kpi, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{kpi.periode}</td>
              <td className="border px-2 py-1">{kpi.kpi_id}</td>
              <td className="border px-2 py-1">{kpi.value}</td>
              <td className="border px-2 py-1">{kpi.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
