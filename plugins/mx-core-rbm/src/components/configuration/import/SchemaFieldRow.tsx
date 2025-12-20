// plugins/mx-core-rbm/src/components/configuration/import/SchemaFieldRow.tsx

'use client';

import React from 'react';
import { FieldDefinition } from '@/types/AssetTypeSchema';
import UnitSelector from './UnitSelector';

type Props = {
  field: FieldDefinition;
  index: number;
  currentValue: string;
  onUpdate: (index: number, patch: Partial<FieldDefinition>) => void;
  onEditEnum: () => void;
};

export default function SchemaFieldRow({
  field,
  index,
  currentValue,
  onUpdate,
  onEditEnum,
}: Props) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className="border px-3 py-2 text-center">
        <input
          type="checkbox"
          checked={field.include}
          onChange={(e) => onUpdate(index, { include: e.target.checked })}
        />
      </td>

      <td className="border px-3 py-2 text-center">
        <input
          type="checkbox"
          checked={!!field.required}
          onChange={(e) => onUpdate(index, { required: e.target.checked })}
        />
      </td>

      <td className="border px-3 py-2">{field.rawName}</td>

      <td className="border px-3 py-2">
        <input
          className="w-full rounded border px-2 py-1"
          value={field.name}
          onChange={(e) => onUpdate(index, { name: e.target.value })}
        />
      </td>

      <td className="border px-3 py-2">
        <select
          className="w-full rounded border px-2 py-1"
          value={field.type}
          onChange={(e) =>
            onUpdate(index, { type: e.target.value as FieldDefinition['type'] })
          }
        >
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="boolean">boolean</option>
          <option value="enum">enum</option>
        </select>

        {field.type === 'enum' && (
          <button
            type="button"
            className="ml-2 inline-flex items-center text-xs text-blue-600 hover:underline"
            onClick={onEditEnum}
          >
            ⚙️
          </button>
        )}
      </td>

      <td className="border px-3 py-2">
        {field.type === 'number' ? (
          <UnitSelector
            value={field.unit ?? ''}
            onChange={(unit) => onUpdate(index, { unit })}
          />
        ) : (
          '-'
        )}
      </td>

      <td className="border px-3 py-2">{currentValue || '-'}</td>
    </tr>
  );
}
