// plugins/mx-core-rbm/src/components/configuration/import/AssetTypeMetaEditor.tsx

'use client';

import React, { useEffect, useState } from 'react';

type AssetCategory = {
  category_id: string;
  name: string;
};

type Meta = {
  asset_type_id: string;
  label: string;
  category_id: string;
};

type Props = {
  meta: Meta;
  onChange: (meta: Meta) => void;
};

export default function AssetTypeMetaEditor({ meta, onChange }: Props) {
  const [categories, setCategories] = useState<AssetCategory[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/mocks/asset-category.json');
        const json = await res.json();
        setCategories(json);
      } catch {
        console.error('Gagal memuat kategori aset');
      }
    }

    loadCategories();
  }, []);

  const update = <K extends keyof Meta>(key: K, value: Meta[K]) => {
    onChange({ ...meta, [key]: value });
  };

  return (
    <div className="space-y-4 rounded border bg-white p-4 shadow dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        ⚙️ Metadata Asset-Type
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Schema Name */}
        <div>
          <label
            htmlFor="schemaSelect"
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Schema Name
          </label>
          <input
            type="text"
            value={meta.asset_type_id}
            onChange={(e) => update('asset_type_id', e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm shadow-sm"
          />
        </div>

        {/* Label */}
        <div>
          <label
            htmlFor="labelSelect"
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Asset Label
          </label>
          <input
            type="text"
            value={meta.label}
            onChange={(e) => update('label', e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm shadow-sm"
          />
        </div>

        {/* Asset Category */}
        <div>
          <label
            htmlFor="categorySelect"
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Kategori Aset
          </label>
          <select
            value={meta.category_id}
            onChange={(e) => update('category_id', e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm shadow-sm"
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
