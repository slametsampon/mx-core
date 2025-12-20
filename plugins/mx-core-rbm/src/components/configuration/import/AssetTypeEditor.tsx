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

  const [meta, setMeta] = useState({
    asset_type_id: worksheet.suggestedSchemaName,
    label: worksheet.label,
    category_id: worksheet.categoryId ?? '',
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMeta({
      asset_type_id: worksheet.suggestedSchemaName,
      label: worksheet.label,
      category_id: worksheet.categoryId ?? '',
    });
    setCurrentIndex(0);
  }, [worksheet]);

  const rows: any[] = getWorksheetRows(worksheet.worksheet);
  const currentRow = rows[currentIndex] ?? {}; // 🔧 ADDED
  const headerRow: string[] = rows[0] ? Object.keys(rows[0]) : [];

  const inferredFields = useColumnInference(headerRow, rows);

  const [fields, setFields] = useState<FieldDefinition[]>([]);

  const isFieldNameValid = () => {
    const requiredFields = fields.filter((f) => f.required);
    const names = requiredFields.map((f) => f.name.trim());
    const hasEmpty = names.some((name) => name === '');
    const hasDuplicates = new Set(names).size !== names.length;
    return !hasEmpty && !hasDuplicates;
  };

  useEffect(() => {
    setFields(
      inferredFields.map((f) => ({
        name: f.suggestedName,
        label: f.label,
        rawName: f.label,
        type: f.type,
        required: f.required,
        unit: f.unit,
        options: f.type === 'enum' ? [] : undefined,
        include: f.include,
      }))
    );
  }, [worksheet]);

  return (
    <div className="space-y-6">
      {/* ✅ Layout: Metadata dan Dropdown sebelah kiri sidebar, lalu Table full width */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_1fr]">
        {/* 📌 Metadata di sisi kiri */}
        <AssetTypeMetaEditor
          meta={meta}
          onChange={setMeta}
          currentIndex={currentIndex}
          totalRows={rows.length}
          onNavigate={setCurrentIndex}
        />

        {/* 📌 Field Table di sisi kanan */}
        <SchemaFieldEditor
          fields={fields}
          onChange={setFields}
          currentRow={currentRow} // 🔧 ADDED
        />
      </div>

      {/* ✅ Tombol Save */}
      <SaveAssetTypeSchemaButton
        assetTypeId={meta.asset_type_id}
        label={meta.label}
        categoryId={meta.category_id}
        fields={fields}
        disabled={!isFieldNameValid()}
      />
    </div>
  );
}
