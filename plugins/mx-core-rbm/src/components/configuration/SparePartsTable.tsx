// plugins/mx-core-rbm/src/components/configuration/SparePartsTable.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { SparePartTemplate } from '@/models/asset/asset-type-schema';

type Props = {
  value: SparePartTemplate[];
  onChange?: (updated: SparePartTemplate[]) => void;
  readOnly?: boolean;
};

export default function SparePartsTable({
  value,
  onChange,
  readOnly = false,
}: Props) {
  const [parts, setParts] = useState<SparePartTemplate[]>(value || []);

  useEffect(() => {
    setParts(value || []);
  }, [value]);

  const handleChange = (
    index: number,
    key: keyof SparePartTemplate,
    newValue: string | number
  ) => {
    const updated = [...parts];
    updated[index] = {
      ...updated[index],
      [key]: key === 'quantity' ? Number(newValue) : newValue,
    };
    setParts(updated);
    onChange?.(updated);
  };

  const handleAdd = () => {
    const newPart: SparePartTemplate = {
      name: '',
      uom: '',
      quantity: 1,
    };
    const updated = [...parts, newPart];
    setParts(updated);
    onChange?.(updated);
  };

  const handleRemove = (index: number) => {
    const updated = [...parts];
    updated.splice(index, 1);
    setParts(updated);
    onChange?.(updated);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Part Number</th>
            <th className="border p-2">UoM</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Remarks</th>
            {!readOnly && <th className="border p-2">Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {parts.map((part, index) => (
            <tr key={index} className="border-t">
              <td className="border p-2">
                {readOnly ? (
                  part.name
                ) : (
                  <input
                    className="w-full rounded border border-gray-300 p-1"
                    value={part.name}
                    onChange={(e) =>
                      handleChange(index, 'name', e.target.value)
                    }
                  />
                )}
              </td>
              <td className="border p-2">
                {readOnly ? (
                  part.partNumber || '-'
                ) : (
                  <input
                    className="w-full rounded border border-gray-300 p-1"
                    value={part.partNumber || ''}
                    onChange={(e) =>
                      handleChange(index, 'partNumber', e.target.value)
                    }
                  />
                )}
              </td>
              <td className="border p-2">
                {readOnly ? (
                  part.uom
                ) : (
                  <input
                    className="w-full rounded border border-gray-300 p-1"
                    value={part.uom}
                    onChange={(e) => handleChange(index, 'uom', e.target.value)}
                  />
                )}
              </td>
              <td className="border p-2 text-center">
                {readOnly ? (
                  part.quantity
                ) : (
                  <input
                    type="number"
                    className="w-20 rounded border border-gray-300 p-1 text-right"
                    value={part.quantity}
                    onChange={(e) =>
                      handleChange(index, 'quantity', e.target.value)
                    }
                  />
                )}
              </td>
              <td className="border p-2">
                {readOnly ? (
                  part.remarks || '-'
                ) : (
                  <input
                    className="w-full rounded border border-gray-300 p-1"
                    value={part.remarks || ''}
                    onChange={(e) =>
                      handleChange(index, 'remarks', e.target.value)
                    }
                  />
                )}
              </td>
              {!readOnly && (
                <td className="border p-2 text-center">
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {!readOnly && (
        <button
          type="button"
          className="mt-3 text-sm text-blue-600 hover:underline"
          onClick={handleAdd}
        >
          + Tambah Part
        </button>
      )}
    </div>
  );
}
