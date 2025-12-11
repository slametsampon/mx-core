// plugins/mx-core-rbm/src/components/configuration/SchemaPreviewView.tsx

'use client';

import { FieldDefinition } from '@/models/asset-type-schema';

interface Props {
  fields: FieldDefinition[];
}

export default function SchemaPreviewView({ fields }: Props) {
  if (!fields || fields.length === 0) {
    return (
      <p className="italic text-gray-500">⚠️ Tidak ada field terdefinisi</p>
    );
  }

  return (
    <table className="w-full border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-2 py-1">#</th>
          <th className="border px-2 py-1">Name</th>
          <th className="border px-2 py-1">Label</th>
          <th className="border px-2 py-1">Type</th>
          <th className="border px-2 py-1">Required</th>
          <th className="border px-2 py-1">Unit</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((f, i) => (
          <tr key={f.name} className="hover:bg-gray-50">
            <td className="border px-2 py-1 text-center">{i + 1}</td>
            <td className="border px-2 py-1">{f.name}</td>
            <td className="border px-2 py-1">{f.label}</td>
            <td className="border px-2 py-1">{f.type}</td>
            <td className="border px-2 py-1 text-center">
              {f.required ? '✅' : '—'}
            </td>
            <td className="border px-2 py-1">{f.unit || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
