// plugins/mx-core-rbm/src/components/configuration/FieldEditor.tsx

'use client';

import { useState, useEffect } from 'react';
import {
  FieldDefinition,
  fieldDefinitionSchema,
} from '@/models/asset-type-schema';
import { z } from 'zod';
import { logger } from '@/utils/logger';

type Props = {
  value: FieldDefinition[];
  onChange?: (updated: FieldDefinition[]) => void;
};

export default function FieldEditor({ value, onChange }: Props) {
  const [fields, setFields] = useState<FieldDefinition[]>(value ?? []);
  const [errors, setErrors] = useState<Record<number, string>>({});

  useEffect(() => {
    setFields(value ?? []);
  }, [value]);

  const handleChange = <K extends keyof FieldDefinition>(
    index: number,
    key: K,
    val: FieldDefinition[K]
  ) => {
    const updated = [...fields];
    updated[index] = {
      ...updated[index],
      [key]: val,
    };

    // Reset options if type changed away from 'enum'
    if (key === 'type' && val !== 'enum') {
      delete updated[index].options;
    }

    setFields(updated);
  };

  const handleOptionChange = (index: number, optionsStr: string) => {
    const updated = [...fields];
    updated[index].options = optionsStr.split(',').map((opt) => opt.trim());
    setFields(updated);
  };

  const handleAdd = () => {
    const newField: FieldDefinition = {
      name: '',
      label: '',
      type: 'string',
      required: false,
    };
    setFields([...fields, newField]);
  };

  const handleRemove = (index: number) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const handleSave = () => {
    const newErrors: Record<number, string> = {};

    const names = fields.map((f) => f.name);
    const duplicates = names.filter((name, i) => names.indexOf(name) !== i);

    fields.forEach((field, index) => {
      try {
        fieldDefinitionSchema.parse(field);

        if (duplicates.includes(field.name)) {
          throw new Error(`Nama field '${field.name}' duplikat`);
        }
      } catch (err: any) {
        newErrors[index] = err?.message ?? 'Field tidak valid';
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      logger.info('[FieldEditor] 💾 Semua field valid, kirim perubahan');
      onChange?.(fields);
    } else {
      logger.warn('[FieldEditor] ⚠️ Ada field tidak valid', newErrors);
    }
  };

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={index} className="space-y-2 rounded border bg-gray-50 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="field-id" className="text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded border px-2 py-1"
                value={field.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="field-id" className="text-sm font-medium">
                Label
              </label>
              <input
                type="text"
                className="w-full rounded border px-2 py-1"
                value={field.label}
                onChange={(e) => handleChange(index, 'label', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="field-id" className="text-sm font-medium">
                Type
              </label>
              <select
                className="w-full rounded border px-2 py-1"
                value={field.type}
                onChange={(e) =>
                  handleChange(
                    index,
                    'type',
                    e.target.value as FieldDefinition['type']
                  )
                }
              >
                <option value="string">string</option>
                <option value="number">number</option>
                <option value="enum">enum</option>
                <option value="boolean">boolean</option>
                <option value="date">date</option>
              </select>
            </div>

            <div>
              <label htmlFor="unit-id" className="text-sm font-medium">
                Unit (optional)
              </label>
              <input
                type="text"
                className="w-full rounded border px-2 py-1"
                value={field.unit ?? ''}
                onChange={(e) => handleChange(index, 'unit', e.target.value)}
              />
            </div>

            {field.type === 'enum' && (
              <div className="col-span-2">
                <label htmlFor="field-id" className="text-sm font-medium">
                  Options (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  className="w-full rounded border px-2 py-1"
                  value={field.options?.join(', ') || ''}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="field-required" className="text-sm font-medium">
              Required?
            </label>
            <input
              type="checkbox"
              className="ml-2"
              checked={field.required}
              onChange={(e) =>
                handleChange(index, 'required', e.target.checked)
              }
            />
          </div>

          {errors[index] && (
            <div className="text-sm text-red-600">{errors[index]}</div>
          )}

          <button
            type="button"
            className="mt-2 text-sm text-red-600 hover:underline"
            onClick={() => handleRemove(index)}
          >
            ✕ Hapus Field
          </button>
        </div>
      ))}

      <div className="flex justify-between border-t pt-4">
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
          onClick={handleAdd}
        >
          + Tambah Field
        </button>

        <button
          type="button"
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          onClick={handleSave}
        >
          💾 Simpan
        </button>
      </div>
    </div>
  );
}
