// plugins/mx-core-rbm/src/components/configuration/import/AssetTypeMetaEditor.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { getService } from '@/services/getService';

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

  currentIndex: number;
  totalRows: number;
  onNavigate: (index: number) => void;
};

export default function AssetTypeMetaEditor({ meta, onChange }: Props) {
  const [categories, setCategories] = useState<AssetCategory[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const service = getService<AssetCategory>('asset-category');
        const result = await service.getAll();
        setCategories(result);
      } catch (err) {
        console.error('Gagal memuat kategori aset:', err);
      }
    };

    loadCategories();
  }, []);

  const update = <K extends keyof Meta>(key: K, value: Meta[K]) => {
    onChange({ ...meta, [key]: value });
  };

  return (
    <div className="space-y-4 rounded border bg-white p-4 shadow">
      <h2 className="text-lg font-semibold">⚙️ Metadata Asset-Type</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Schema Name */}
        <div>
          <label htmlFor="schemaName" className="text-sm font-medium">
            Schema Name
          </label>
          <input
            id="schemaName"
            value={meta.asset_type_id}
            onChange={(e) => update('asset_type_id', e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm"
          />
        </div>

        {/* Asset Label */}
        <div>
          <label htmlFor="label" className="text-sm font-medium">
            Asset Label
          </label>
          <input
            id="label"
            value={meta.label}
            onChange={(e) => update('label', e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm"
          />
        </div>

        {/* Category: SELECT + Suggested */}
        <div>
          <label htmlFor="category" className="text-sm font-medium">
            Kategori Aset
          </label>
          <select
            id="category"
            value={meta.category_id}
            onChange={(e) => update('category_id', e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm"
          >
            <option value="">-- Pilih Kategori Aset --</option>
            {categories.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.category_id} - {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
