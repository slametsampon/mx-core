// plugins/mx-core-rbm/src/components/configuration/EnumEditorModal.tsx

'use client';

import React, { useState } from 'react';

type Props = {
  fieldName: string;
  options: string[];
  onSave: (newOptions: string[]) => void;
  onClose: () => void;
};

export default function EnumEditorModal({
  fieldName,
  options,
  onSave,
  onClose,
}: Props) {
  const [localOptions, setLocalOptions] = useState<string[]>(options);

  const handleChange = (value: string, index: number) => {
    const clone = [...localOptions];
    clone[index] = value;
    setLocalOptions(clone);
  };

  const addOption = () => setLocalOptions([...localOptions, '']);

  const removeOption = (index: number) => {
    const clone = [...localOptions];
    clone.splice(index, 1);
    setLocalOptions(clone);
  };

  const handleSave = () => {
    const cleaned = localOptions.map((opt) => opt.trim()).filter((opt) => opt);
    onSave(cleaned);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-lg dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-semibold">
          ⚙️ Edit Enum: <span className="text-blue-600">{fieldName}</span>
        </h2>

        <div className="max-h-60 space-y-2 overflow-auto pr-2">
          {localOptions.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                className="flex-1 rounded border px-2 py-1"
                value={opt}
                onChange={(e) => handleChange(e.target.value, idx)}
              />
              <button
                onClick={() => removeOption(idx)}
                className="text-sm text-red-500 hover:underline"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={addOption}
            className="text-sm text-blue-600 hover:underline"
          >
            ➕ Tambah Option
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded border border-gray-400 px-4 py-1 text-sm"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="rounded bg-blue-600 px-4 py-1 text-sm text-white"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
