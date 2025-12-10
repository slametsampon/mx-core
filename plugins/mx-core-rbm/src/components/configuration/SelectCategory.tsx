// plugins/mx-core-rbm/src/components/configuration/SelectCategory.tsx

'use client';

import React from 'react';
import { AssetCategory } from '@/models/asset-category';

type Props = {
  categories: AssetCategory[];
  value: string;
  onChange: (categoryId: string) => void;
};

export default function SelectCategory({ categories, value, onChange }: Props) {
  const selectId = 'select-asset-category';

  return (
    <div>
      <label
        htmlFor={selectId}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Kategori Aset
      </label>

      <select
        id={selectId} // 👈 Wajib
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
      >
        <option value="">-- Pilih Kategori --</option>
        {categories.map((cat) => (
          <option key={cat.category_id} value={cat.category_id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
