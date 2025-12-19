// plugins/mx-core-rbm/src/components/configuration/import/SchemaFieldEditor.tsx

'use client';

import React, { useState } from 'react';
import { FieldDefinition } from '@/types/AssetTypeSchema';
import EnumEditorModal from './EnumEditorModal';

type Props = {
  fields: FieldDefinition[];
  onChange: (fields: FieldDefinition[]) => void;
};

export default function SchemaFieldEditor({ fields, onChange }: Props) {
  // 🔑 index field enum yang sedang diedit (null = modal tertutup)
  const [editingEnumIndex, setEditingEnumIndex] = useState<number | null>(null);

  // 🔁 update satu field dengan aman
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
            <th className="border px-3 py-2 text-left">Raw Name</th>
            <th className="border px-3 py-2 text-left">Suggested Name</th>
            <th className="border px-3 py-2 text-left">Type</th>
            <th className="border px-3 py-2 text-left">Required</th>
            <th className="border px-3 py-2 text-left">Unit</th>
            <th className="border px-3 py-2 text-left">Enum</th>
          </tr>
        </thead>

        <tbody>
          {fields.map((f, idx) => (
            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              {/* Raw Name */}
              <td className="border px-3 py-2">{f.rawName ?? '-'}</td>

              {/* Suggested Name */}
              <td className="border px-3 py-2">
                <input
                  className="w-full rounded border px-2 py-1"
                  value={f.name}
                  onChange={(e) => updateField(idx, { name: e.target.value })}
                />
              </td>

              {/* Type */}
              <td className="border px-3 py-2">
                <select
                  className="w-full rounded border px-2 py-1"
                  value={f.type}
                  onChange={(e) =>
                    updateField(idx, { type: e.target.value as any })
                  }
                >
                  <option value="string">string</option>
                  <option value="number">number</option>
                  <option value="boolean">boolean</option>
                  <option value="enum">enum</option>
                </select>
              </td>

              {/* Required */}
              <td className="border px-3 py-2 text-center">
                <input
                  type="checkbox"
                  checked={!!f.required}
                  onChange={(e) =>
                    updateField(idx, { required: e.target.checked })
                  }
                />
              </td>

              {/* Unit */}
              <td className="border px-3 py-2">
                <input
                  className="w-full rounded border px-2 py-1"
                  value={f.unit ?? ''}
                  onChange={(e) => updateField(idx, { unit: e.target.value })}
                />
              </td>

              {/* Enum */}
              <td className="border px-3 py-2 text-center">
                {f.type === 'enum' ? (
                  <button
                    type="button"
                    className="rounded border px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setEditingEnumIndex(idx)}
                  >
                    ⚙️ Edit
                  </button>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔔 Enum Modal (GLOBAL, BUKAN DI DALAM ROW) */}
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
