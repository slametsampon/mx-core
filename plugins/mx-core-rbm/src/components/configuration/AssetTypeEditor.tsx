// plugins/mx-core-rbm/src/components/configuration/AssetTypeEditor.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { WorksheetDefinition } from '@/services/importer';

type AssetCategory = {
  category_id: string;
  name: string;
};

type Props = {
  worksheet: WorksheetDefinition;
  meta: {
    asset_type_id: string;
    label: string;
    category_id: string;
  };
  onChange: (meta: {
    asset_type_id: string;
    label: string;
    category_id: string;
  }) => void;
};

export default function AssetTypeMetaEditor({
  worksheet,
  meta,
  onChange,
}: Props) {
  const [schemaName, setSchemaName] = useState(meta.asset_type_id);
  const [label, setLabel] = useState(meta.label);
  const [categoryId, setCategoryId] = useState(meta.category_id);

  const [categories, setCategories] = useState<AssetCategory[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/mocks/asset-category.json');
        const json = await res.json();
        setCategories(json);
      } catch (err) {
        console.error('Gagal memuat kategori aset');
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    onChange({
      asset_type_id: schemaName,
      label,
      category_id: categoryId,
    });
  }, [schemaName, label, categoryId]);

  return (
    <div className="space-y-4 rounded border bg-white p-4 shadow dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        ⚙️ Metadata Asset-Type
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Worksheet */}
        <div>
          <label
            htmlFor="worksheet"
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Worksheet
          </label>
          <input
            type="text"
            id="worksheet"
            value={worksheet.worksheet}
            readOnly
            className="w-full rounded border bg-gray-100 px-3 py-2 text-sm shadow-sm dark:bg-gray-700"
          />
        </div>

        {/* Label */}
        <div>
          <label
            htmlFor="label"
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Asset Label
          </label>
          <input
            type="text"
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm shadow-sm"
          />
        </div>

        {/* Schema Name */}
        <div>
          <label
            htmlFor="schemaName"
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Schema Name
          </label>
          <input
            type="text"
            id="schemaName"
            value={schemaName}
            onChange={(e) => setSchemaName(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm shadow-sm"
          />
        </div>

        {/* Asset Category */}
        <div>
          <label
            htmlFor="assetCategory"
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Kategori Aset
          </label>
          <select
            id="assetCategory"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
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
