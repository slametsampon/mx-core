// plugins/mx-core-rbm/src/components/configuration/import/SchemaFieldEditor.tsx

'use client';

import React, { useState } from 'react';
import { FieldDefinition } from '@/types/AssetTypeSchema';
import EnumEditorModal from './EnumEditorModal';
import SchemaFieldRow from './SchemaFieldRow';

type Props = {
  fields: FieldDefinition[];
  onChange: (fields: FieldDefinition[]) => void;
  currentRow: Record<string, any>;
};

export default function SchemaFieldEditor({
  fields,
  onChange,
  currentRow,
}: Props) {
  const [editingEnumIndex, setEditingEnumIndex] = useState<number | null>(null);

  const updateField = (index: number, patch: Partial<FieldDefinition>) => {
    const next = [...fields];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  return (
    <div className="overflow-x-auto rounded border">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="border px-3 py-2 text-left">Include</th>
            <th className="border px-3 py-2 text-left">Required</th>
            <th className="border px-3 py-2 text-left">Raw Name</th>
            <th className="border px-3 py-2 text-left">Suggested Name</th>
            <th className="w-[115px] border px-3 py-2 text-left">Type</th>
            <th className="w-[100px] border px-3 py-2 text-left">Unit</th>
            <th className="border px-3 py-2 text-left">Value</th>
          </tr>
        </thead>

        <tbody>
          {fields.map((field, index) => (
            <SchemaFieldRow
              key={index}
              field={field}
              index={index}
              currentValue={String(currentRow?.[field.rawName] ?? '')}
              onUpdate={updateField}
              onEditEnum={() => setEditingEnumIndex(index)}
            />
          ))}
        </tbody>
      </table>

      {editingEnumIndex !== null && (
        <EnumEditorModal
          fieldName={fields[editingEnumIndex].label}
          options={fields[editingEnumIndex].options ?? []}
          onSave={(opts) => updateField(editingEnumIndex, { options: opts })}
          onClose={() => setEditingEnumIndex(null)}
        />
      )}
    </div>
  );
}
