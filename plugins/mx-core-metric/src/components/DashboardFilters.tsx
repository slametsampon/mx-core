// plugins/mx-core-metric/src/components/DashboardFilters.tsx

'use client';
import { useState } from 'react';

export default function DashboardFilters({
  onChange,
}: {
  onChange: (filters: any) => void;
}) {
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <div className="mb-4 flex items-center gap-4">
      <label>
        Tahun:
        <input
          type="number"
          value={year}
          onChange={(e) => {
            const newYear = parseInt(e.target.value);
            setYear(newYear);
            onChange({ year: newYear });
          }}
          className="ml-2 w-24 rounded border px-2 py-1"
        />
      </label>
    </div>
  );
}
