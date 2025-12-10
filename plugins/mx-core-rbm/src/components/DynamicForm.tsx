// plugins/mx-core-rbm/src/components/DynamicForm.tsx

'use client';

import { AssetTypeSchema } from '@/models/asset-type-schema';
import { useState, useEffect } from 'react';
import { logger } from '@/utils/logger';

type Props = {
  schema?: AssetTypeSchema; // ❗️make optional to prevent undefined crash
  onSubmit: (data: Record<string, any>) => void;
};

export function DynamicForm({ schema, onSubmit }: Props) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Log schema load (debugging)
  useEffect(() => {
    if (schema) {
      logger.info('📥 [DynamicForm] Schema loaded:', schema.asset_type_id);
    }
  }, [schema]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logger.info('📤 [DynamicForm] Submit data:', formData);
    onSubmit(formData);
  };

  if (!schema || !schema.fields || schema.fields.length === 0) {
    logger.warn('❌ [DynamicForm] Invalid or empty schema:', schema);
    return (
      <div className="text-sm italic text-red-500">
        Schema belum tersedia atau tidak valid.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 rounded-md border bg-white p-4 shadow-sm"
    >
      {schema.fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <label htmlFor={field.name} className="font-medium">
            {field.label}
          </label>

          {field.type === 'enum' ? (
            <select
              id={field.name}
              required={field.required}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="input input-bordered"
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
              id={field.name}
              type={
                field.type === 'number'
                  ? 'number'
                  : field.type === 'date'
                  ? 'date'
                  : 'text'
              }
              required={field.required}
              onChange={(e) =>
                handleChange(
                  field.name,
                  field.type === 'number'
                    ? parseFloat(e.target.value)
                    : e.target.value
                )
              }
              className="input input-bordered"
            />
          )}
        </div>
      ))}

      <div className="col-span-2">
        <button type="submit" className="btn btn-primary w-full">
          Simpan
        </button>
      </div>
    </form>
  );
}
