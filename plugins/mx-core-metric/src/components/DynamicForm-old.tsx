// plugins/mx-core-metric/src/components/DynamicForm.tsx

'use client';

import { useEffect, useState } from 'react';
import { modelDefinitions, ModelKey } from '@/config/modelDefinitions';
import {
  z,
  ZodObject,
  ZodTypeAny,
  ZodEnum,
  ZodUnion,
  ZodNumber,
  ZodOptional,
  ZodNullable,
} from 'zod';

type Props = {
  model: ModelKey;
  mode: 'new' | 'edit'; // ✅ Tambahkan ini
  initialData?: any;
  onSaved: (payload: any) => void;
  onCancel?: () => void;
};

export function DynamicForm({ model, initialData, onSaved, onCancel }: Props) {
  const definition = modelDefinitions[model];
  const schema = definition.schema as ZodObject<any>;
  const shape = schema.shape as Record<string, ZodTypeAny>;

  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const emptyData: Record<string, any> = {};
      for (const field of definition.fields) {
        emptyData[field.key] = '';
      }
      setFormData(emptyData);
    }
  }, [initialData, model]);

  function handleChange(key: string, value: any) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  const getEnumOptions = (type: ZodTypeAny): string[] | undefined => {
    let inner: any = type;

    // Unwrap optional / nullable
    if (inner instanceof ZodOptional || inner instanceof ZodNullable) {
      inner = inner._def.innerType;
    }

    // Direct ZodEnum
    if (inner instanceof ZodEnum) {
      return inner.options.map((o: any) => String(o));
    }

    // Union case
    if (inner instanceof ZodUnion) {
      const unionOptions = inner._def.options as any[];

      // ❗ IMPORTANT: Jangan pakai predicate type guard di find()
      const found = unionOptions.find((opt: any) => {
        return opt instanceof ZodEnum;
      });

      if (found instanceof ZodEnum) {
        return found.options.map((o: any) => String(o));
      }
    }

    return undefined;
  };

  function unwrapZodType(type: ZodTypeAny): ZodTypeAny {
    let current = type;

    while (current instanceof ZodOptional || current instanceof ZodNullable) {
      current = (current as any)._def.innerType;
    }

    return current;
  }

  function isNumberField(zodType: ZodTypeAny): boolean {
    const unwrapped = unwrapZodType(zodType);
    return unwrapped instanceof z.ZodNumber;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(formData);
    if (!result.success) {
      alert('❌ Validasi gagal. Periksa input.');
      console.warn(result.error);
      return;
    }

    if (onSaved) {
      onSaved(result.data);
    }

    setFormData({});
  }

  const isEditMode = Boolean(initialData?.id);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded border bg-white p-4 shadow-sm dark:bg-gray-900"
    >
      {definition.fields.map((field) => {
        const zodType = shape[field.key];
        const enumOptions = getEnumOptions(zodType);
        const isNumber = isNumberField(zodType);
        const value = formData[field.key] ?? '';

        return (
          <div key={field.key} className="flex flex-col">
            <label htmlFor={field.key} className="mb-1 text-sm font-medium">
              {field.label}
            </label>

            {enumOptions ? (
              <select
                id={field.key}
                value={value}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="rounded border px-3 py-2"
              >
                <option value="">-- Pilih --</option>
                {enumOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.key}
                type={isNumber ? 'number' : 'text'}
                value={value}
                onChange={(e) =>
                  handleChange(
                    field.key,
                    isNumber ? Number(e.target.value) : e.target.value
                  )
                }
                className="rounded border px-3 py-2"
              />
            )}
          </div>
        );
      })}

      {/* Action Buttons */}
      <div className="flex justify-between pt-2">
        {isEditMode && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded border px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Batal
          </button>
        )}

        <button
          type="submit"
          className="ml-auto rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          {isEditMode ? 'Update' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}
