// plugins/mx-core-rbm/src/components/configuration/AssetTypeForm.tsx

'use client';

import { AssetTypeSchema } from '@/models/asset/asset-type-schema';

type Props = {
  value: AssetTypeSchema;
  onChange: (updated: AssetTypeSchema) => void;
};

export default function AssetTypeForm({ value, onChange }: Props) {
  const handleChange = (key: keyof AssetTypeSchema, newValue: string) => {
    onChange({
      ...value,
      [key]: newValue,
    });
  };

  return (
    <form className="space-y-4">
      <div>
        <label
          htmlFor="asset_type_id"
          className="block text-sm font-medium text-gray-700"
        >
          Asset Type ID
        </label>
        <input
          id="asset_type_id"
          type="text"
          value={value.asset_type_id}
          onChange={(e) => handleChange('asset_type_id', e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="label"
          className="block text-sm font-medium text-gray-700"
        >
          Label
        </label>
        <input
          id="label"
          type="text"
          value={(value as any).label || ''}
          onChange={(e) =>
            onChange({
              ...value,
              label: e.target.value, // optional field, custom property if needed
            })
          }
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="category_id"
          className="block text-sm font-medium text-gray-700"
        >
          Category ID
        </label>
        <input
          id="category_id"
          type="text"
          value={(value as any).category_id || ''}
          onChange={(e) =>
            onChange({
              ...value,
              category_id: e.target.value, // optional field, custom property if needed
            })
          }
          className="w-full rounded border px-3 py-2"
        />
      </div>
    </form>
  );
}
