// plugins/mx-core-rbm/src/components/AssetForm.tsx

import { AssetTypeSchema } from '@/models/asset-type-schema';
import { useState } from 'react';

interface Props {
  schema: AssetTypeSchema;
}

export default function AssetForm({ schema }: Props) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form className="grid grid-cols-2 gap-4">
      {schema.fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label>{field.label}</label>
          {field.type === 'enum' ? (
            <select onChange={(e) => handleChange(field.name, e.target.value)}>
              <option value="">--Pilih--</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type === 'number' ? 'number' : 'text'}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
            />
          )}
        </div>
      ))}
      <button type="submit" className="btn-primary col-span-2">
        Simpan
      </button>
    </form>
  );
}
