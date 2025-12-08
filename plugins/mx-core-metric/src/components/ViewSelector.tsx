// plugins/mx-core-metric/src/components/ViewSelector.tsx

import { ViewKey, viewDefinitions } from '@/config/viewDefinitions';

export function ViewSelector({
  current,
  onChange,
}: {
  current: ViewKey;
  onChange: (v: ViewKey) => void;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="view-select" className="mb-1 block text-sm font-medium">
        Pilih View
      </label>{' '}
      <select
        value={current}
        onChange={(e) => onChange(e.target.value as ViewKey)}
        className="rounded border px-3 py-1"
      >
        {Object.entries(viewDefinitions).map(([key, def]) => (
          <option key={key} value={key}>
            {def.label}
          </option>
        ))}
      </select>
    </div>
  );
}
