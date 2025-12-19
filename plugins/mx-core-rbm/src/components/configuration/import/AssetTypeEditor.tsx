// plugins/mx-core-rbm/src/components/configuration/import/AssetTypeEditor.tsx

'use client';

import React, { useEffect, useState } from 'react';

import AssetTypeMetaEditor from './AssetTypeMetaEditor';
import SchemaFieldEditor from './SchemaFieldEditor';
import SaveAssetTypeSchemaButton from './SaveAssetTypeSchemaButton';

import { WorksheetDefinition } from '@/services/importer';
import { useColumnInference } from '@/hooks/useColumnInference';
import { FieldDefinition } from '@/types/AssetTypeSchema';
import { useImportSchema } from '@/contexts/ImportSchemaContext';

type Props = {
  worksheet: WorksheetDefinition;
};

export default function AssetTypeEditor({ worksheet }: Props) {
  const { getWorksheetRows } = useImportSchema();

  // 🧠 1. Sync metadata with worksheet selection
  const [meta, setMeta] = useState({
    asset_type_id: worksheet.suggestedSchemaName,
    label: worksheet.label,
    category_id: worksheet.categoryId ?? '',
  });

  useEffect(() => {
    setMeta({
      asset_type_id: worksheet.suggestedSchemaName,
      label: worksheet.label,
      category_id: worksheet.categoryId ?? '',
    });
  }, [worksheet]);

  // 🧠 2. Ambil rows langsung dari context
  const rows: any[] = getWorksheetRows(worksheet.worksheet);
  const headerRow: string[] = rows[0] ? Object.keys(rows[0]) : [];

  // 🧠 3. Infer struktur kolom
  const inferredFields = useColumnInference(headerRow, rows);

  // 🧠 4. Konversi ke FieldDefinition saat worksheet berubah
  const [fields, setFields] = useState<FieldDefinition[]>([]);
  useEffect(() => {
    setFields(
      inferredFields.map((f) => ({
        name: f.suggestedName,
        label: f.rawName,
        rawName: f.rawName,
        type: f.type,
        required: f.required,
        unit: f.unit,
        options: f.type === 'enum' ? [] : undefined,
      }))
    );
  }, [worksheet]);

  return (
    <div className="space-y-6">
      {/* 📌 Metadata Editor */}
      <AssetTypeMetaEditor meta={meta} onChange={setMeta} />

      {/* 📌 Editor Fields */}
      <SchemaFieldEditor fields={fields} onChange={setFields} />

      {/* 📌 Tombol Simpan */}
      <SaveAssetTypeSchemaButton
        assetTypeId={meta.asset_type_id}
        label={meta.label}
        categoryId={meta.category_id}
        fields={fields}
      />
    </div>
  );
}
