// plugins/mx-core-metric/src/components/ViewSelector.tsx

import { viewDefinitions, ViewKey } from '@/config/viewDefinitions';

type Props = {
  current: ViewKey;
  onChange: (v: ViewKey) => void;
};

export function ViewSelector({ current, onChange }: Props) {
  return (
    <div className="mb-4">
      <label
        htmlFor="view-select"
        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        Pilih View
      </label>
      <select
        id="view-select"
        value={current}
        onChange={(e) => onChange(e.target.value as ViewKey)}
        className="w-full min-w-[280px] rounded border border-gray-300 px-3 py-2 pr-8 text-sm dark:bg-gray-800 dark:text-white"
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
