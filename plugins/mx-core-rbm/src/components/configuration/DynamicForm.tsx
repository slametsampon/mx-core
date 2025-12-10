// plugins/mx-core-rbm/src/components/configuration/DynamicForm.tsx

'use client';

import React, { useState } from 'react';
import { FieldDefinition } from '@/models/asset-type-schema';

type Props = {
  fields: FieldDefinition[];
  onSubmit: (data: Record<string, any>) => void;
};

export default function DynamicForm({ fields, onSubmit }: Props) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => {
        const fieldId = `field-${field.name}`;

        return (
          <div key={field.name} className="flex flex-col">
            <label
              htmlFor={fieldId}
              className="text-sm font-medium text-gray-700"
            >
              {field.label}
              {field.unit && (
                <span className="ml-1 text-xs text-gray-500">
                  ({field.unit})
                </span>
              )}
            </label>

            {field.type === 'enum' ? (
              <select
                id={fieldId}
                required={field.required}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">-- Pilih --</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={fieldId}
                type={
                  field.type === 'number'
                    ? 'number'
                    : field.type === 'date'
                    ? 'date'
                    : 'text'
                }
                required={field.required}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="rounded border border-gray-300 px-3 py-2 text-sm"
              />
            )}
          </div>
        );
      })}

      <div>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
