// plugins/mx-core-metric/src/components/DisturbanceTable.tsx

'use client';

import { useMockData } from '@/data/useMockData';
import { DisturbanceLog } from '@/models/disturbanceLog';

export default function DisturbanceTable() {
  const { data, loading } = useMockData<DisturbanceLog[]>(
    'disturbance_log.json'
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">⚠️ Disturbances</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Periode</th>
            <th className="border px-2 py-1">Unit</th>
            <th className="border px-2 py-1">Source</th>
            <th className="border px-2 py-1">Duration</th>
            <th className="border px-2 py-1">Category</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{d.periode}</td>
              <td className="border px-2 py-1">{d.unit_id}</td>
              <td className="border px-2 py-1">{d.source_id}</td>
              <td className="border px-2 py-1">{d.duration_minutes} min</td>
              <td className="border px-2 py-1">{d.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
