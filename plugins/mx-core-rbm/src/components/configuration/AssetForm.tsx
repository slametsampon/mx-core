// plugins/mx-core-rbm/src/components/configuration/AssetForm.tsx

'use client';

import { useEffect, useState } from 'react';
import { Asset } from '@/models/asset';

interface Props {
  asset: Asset;
  onChange: (updated: Asset) => void;
}

export default function AssetForm({ asset, onChange }: Props) {
  const [formData, setFormData] = useState<Asset>(asset);

  useEffect(() => {
    setFormData(asset);
  }, [asset]);

  const handleChange = (field: keyof Asset, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange(updated);
  };

  return (
    <form className="space-y-4">
      {(
        [
          ['tag_number', 'Tag Number'],
          ['description', 'Description'],
          ['asset_type_id', 'Asset Type ID'],
          ['unit', 'Unit'],
          ['area', 'Area'],
          ['status', 'Status'],
        ] as [keyof Asset, string][]
      ).map(([key, label]) => (
        <div key={key}>
          <label htmlFor={key} className="block text-sm font-medium">
            {label}
          </label>
          <input
            id={key}
            type="text"
            value={formData[key] || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>
      ))}

      {formData.installation_date && (
        <div>
          <label
            htmlFor="installation_date"
            className="block text-sm font-medium"
          >
            Installation Date
          </label>
          <input
            id="installation_date"
            type="date"
            value={formData.installation_date}
            onChange={(e) => handleChange('installation_date', e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>
      )}
    </form>
  );
}
