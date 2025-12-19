// plugins/mx-core-rbm/src/components/configuration/import/SaveAssetTypeSchemaButton.tsx

'use client';

import React from 'react';

type Props = {
  assetTypeId: string;
  label: string;
  categoryId: string;
  fields: any[];
};

export default function SaveAssetTypeSchemaButton({
  assetTypeId,
  label,
  categoryId,
  fields,
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
        className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        💾 Simpan Schema (Download JSON)
      </button>
    </div>
  );
}
