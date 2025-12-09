// plugins/mx-core-metric/src/components/SmartFilterControls.tsx

'use client';

import { viewDefinitions, ViewKey } from '@/config/viewDefinitions';
import { useState } from 'react';

type Props = {
  view: ViewKey;
  filters: Record<string, string>;
  onChange: (f: Record<string, string>) => void;
};

export function SmartFilterControls({ view, filters, onChange }: Props) {
  const def = viewDefinitions[view];
  const filterableFields = def.fields.filter((f) => 'filter' in f);

  const [selectedKey, setSelectedKey] = useState(
    filterableFields[0]?.key || ''
  );

  const handleValueChange = (value: string) => {
    onChange({ ...filters, [selectedKey]: value });
  };

  return (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-4">
      {/* Dropdown pilih field */}
      <div className="w-full sm:w-1/3">
        <label
          htmlFor="filter-key"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Pilih Field Filter
        </label>
        <select
          id="filter-key"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
        >
          {filterableFields.map((f) => (
            <option key={f.key} value={f.key}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Input nilai */}
      <div className="w-full sm:w-2/3">
        <label
          htmlFor="filter-value"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Nilai
        </label>
        <input
          id="filter-value"
          type="text"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
          placeholder={`Isi nilai untuk ${selectedKey}`}
          value={filters[selectedKey] || ''}
          onChange={(e) => handleValueChange(e.target.value)}
        />
      </div>
    </div>
  );
}
