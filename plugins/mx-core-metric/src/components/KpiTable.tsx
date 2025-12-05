// plugins/mx-core-metric/src/components/KpiTable.tsx

'use client';

import { useMockData } from '@/data/useMockData';
import { KpiRecord } from '@/models/kpiRecord';

export default function KpiTable() {
  const { data, loading } = useMockData<KpiRecord[]>('kpi_record.json');

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">📋 KPI Records</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Periode</th>
            <th className="border px-2 py-1">KPI</th>
            <th className="border px-2 py-1">Value</th>
            <th className="border px-2 py-1">Source</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{item.periode}</td>
              <td className="border px-2 py-1">{item.kpi_id}</td>
              <td className="border px-2 py-1">{item.value}</td>
              <td className="border px-2 py-1">{item.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
