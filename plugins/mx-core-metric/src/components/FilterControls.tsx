// plugins/mx-core-metric/src/components/FilterControls.tsx

'use client';

import { viewDefinitions, ViewKey } from '@/config/viewDefinitions';

type Props = {
  view: ViewKey;
  filters: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
};

export function FilterControls({ view, filters, onChange }: Props) {
  const fields = viewDefinitions[view].fields.filter((f) => f.filter);

  if (fields.length === 0) return null;

  return (
    <div
      className="
        mb-4 grid grid-cols-2
        gap-4 sm:grid-cols-3 lg:grid-cols-4
      "
    >
      {fields.map(({ key, label }) => (
        <div key={key}>
          <label
            htmlFor={`filter-${key}`}
            className="mb-1 block text-sm font-medium"
          >
            {label}
          </label>

          <input
            id={`filter-${key}`}
            type="text"
            placeholder={`Filter ${label}`}
            value={filters[key] ?? ''}
            onChange={(e) => onChange({ ...filters, [key]: e.target.value })}
            className="w-full rounded border px-3 py-2 text-sm"
          />
        </div>
      ))}
    </div>
  );
}
