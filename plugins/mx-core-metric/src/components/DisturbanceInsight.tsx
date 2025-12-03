// plugins/mx-core-metric/src/components/DisturbanceInsight.tsx

'use client';

import { useDisturbanceData } from '@/hooks/useDisturbanceData';

export default function DisturbanceInsight() {
  const { data, loading, error } = useDisturbanceData();

  if (loading) return <p>Loading Disturbance...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data) return <p>No disturbance data.</p>;

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">⚠️ Disturbance Insight</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Periode</th>
            <th className="border px-2 py-1">Unit</th>
            <th className="border px-2 py-1">Source</th>
            <th className="border px-2 py-1">Duration</th>
            <th className="border px-2 py-1">Category</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => (
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
