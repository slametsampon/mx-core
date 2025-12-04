// plugins/mx-core-metric/src/components/DynamicForm.tsx

'use client';

import { useEffect, useState } from 'react';
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

import { modelDefinitions, ModelKey } from '@/config/modelDefinitions';
import { getService } from '@/services/getService';

type Props = {
  model: ModelKey;
  mode: 'new' | 'edit';
  initialData?: any;
  onSaved: (payload: any) => void;
  onCancel?: () => void;
};

export function DynamicForm({
  model,
  mode,
  initialData,
  onSaved,
  onCancel,
}: Props) {
  const definition = modelDefinitions[model];
  const schema = definition.schema as ZodObject<any>;
  const shape = schema.shape as Record<string, ZodTypeAny>;

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [relationalOptions, setRelationalOptions] = useState<
    Record<string, any[]>
  >({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // ⬇️ Cek jika field mengacu ke model lain (relasi), lalu ambil datanya
  useEffect(() => {
    async function loadRelationalData() {
      const options: Record<string, any[]> = {};

      for (const field of definition.fields) {
        if (field.key.endsWith('_id')) {
          const relatedModel = field.key.replace(/_id$/, '') as ModelKey;
          try {
            const service = getService(relatedModel);
            const data = await service.getAll();
            options[field.key] = data;
          } catch (err: any) {
            console.warn(
              `[DynamicForm] ⚠️ Gagal load relasi "${relatedModel}":`,
              err.message
            );
            options[field.key] = []; // prevent crash, empty dropdown
          }
        }
      }

      setRelationalOptions(options);
    }

    loadRelationalData();
  }, [model]);

  // ⬇️ Siapkan data awal atau kosong
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const empty: Record<string, any> = {};
      for (const f of definition.fields) {
        empty[f.key] = '';
      }
      setFormData(empty);
    }
  }, [initialData, model]);

  // ⬇️ Handle Input
  function handleChange(key: string, value: any) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  // ⬇️ Ambil pilihan dari enum (ZodEnum atau ZodUnion<ZodEnum>)
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
    return unwrapZodType(zodType) instanceof ZodNumber;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = schema.safeParse(formData);

    if (!result.success) {
      // 🔍 Ambil semua issue dari ZodError
      const issues = result.error.issues;

      // ✅ Susun error per field
      const fieldErrors: Record<string, string> = {};
      for (const issue of issues) {
        const field = String(issue.path[0]);
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }

      // ⛔️ Set semua pesan error ke state
      setFormErrors(fieldErrors);
      return;
    }

    // ✅ Bersihkan error jika valid
    setFormErrors({});
    onSaved(result.data);
    setFormData({});
  }

  const isEditMode = mode === 'edit';

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

        // Dropdown relasi (e.g. unit_id, department_id)
        const relOptions = relationalOptions[field.key];

        return (
          <div key={field.key} className="flex flex-col">
            <label htmlFor={field.key} className="mb-1 text-sm font-medium">
              {field.label}
            </label>

            {relOptions ? (
              <select
                id={field.key}
                value={value}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="rounded border px-3 py-2"
              >
                <option value="">-- Pilih --</option>
                {relOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name || item.label || item.id}
                  </option>
                ))}
              </select>
            ) : enumOptions ? (
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
            {formErrors[field.key] && (
              <p className="text-sm text-red-600">{formErrors[field.key]}</p>
            )}
          </div>
        );
      })}

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-4">
        {isEditMode && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            ❌ Batal
          </button>
        )}

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          {isEditMode ? '🔄 Update' : '💾 Simpan'}
        </button>
      </div>
    </form>
  );
}
