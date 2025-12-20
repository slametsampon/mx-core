// plugins/mx-core-rbm/src/components/configuration/import/SaveAssetTypeSchemaButton.tsx

'use client';

import React from 'react';

type Props = {
  assetTypeId: string;
  label: string;
  categoryId: string;
  fields: any[];
  disabled?: boolean; // ✅ TAMBAH INI
};

export default function SaveAssetTypeSchemaButton({
  assetTypeId,
  label,
  categoryId,
  fields,
  disabled,
}: Props) {
  const handleSave = () => {
    if (!assetTypeId || !label) {
      alert('⚠️ Asset Type ID dan Label wajib diisi.');
      return;
    }

    const schema = {
      asset_type_id: assetTypeId,
      label,
      category_id: categoryId || 'uncategorized',
      fields,
      ppc_strategy: {
        preventive: [],
        predictive: [],
        corrective: [],
      },
      spare_parts: [],
    };

    const blob = new Blob([JSON.stringify(schema, null, 2)], {
      type: 'application/json',
    });

    const fileName = `${assetTypeId}.json`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="mt-4 text-right">
      <button
        onClick={handleSave}
        disabled={disabled}
        className={`rounded px-4 py-2 text-sm text-white ${
          disabled
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        💾 Simpan Schema (Download JSON)
      </button>
    </div>
  );
}
