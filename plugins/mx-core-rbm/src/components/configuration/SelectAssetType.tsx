// plugins/mx-core-rbm/src/components/configuration/SelectAssetType.tsx

'use client';

import React from 'react';
import { AssetType } from '@/models/asset/asset-type';

type Props = {
  assetTypes: AssetType[];
  category: string;
  value: string;
  onChange: (assetTypeId: string) => void;
};

export default function SelectAssetType({
  assetTypes,
  category,
  value,
  onChange,
}: Props) {
  const filtered = assetTypes.filter((type) => type.category_id === category);

  const selectId = 'select-asset-type';

  return (
    <div>
      <label
        htmlFor={selectId}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Tipe Aset
      </label>

      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!category}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
      >
        <option value="">-- Pilih Tipe Aset --</option>
        {filtered.map((type) => (
          <option key={type.asset_type_id} value={type.asset_type_id}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
}
