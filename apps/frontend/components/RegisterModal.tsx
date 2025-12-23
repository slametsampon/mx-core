// apps/frontend/components/RegisterModal.tsx

'use client';

import { type FC } from 'react';

interface RegisterModalProps {
  visible: boolean;
  values: {
    username: string;
    password1: string;
    password2: string;
    role: string;
  };
  error?: string;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const RegisterModal: FC<RegisterModalProps> = ({
  visible,
  values,
  error,
  onChange,
  onSubmit,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
          Registrasi Pengguna
        </h2>

        {error && <div className="mb-2 text-sm text-red-500">{error}</div>}

        <div className="space-y-4">
          <input
            className="w-full rounded border border-slate-300 p-2 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            placeholder="Username"
            value={values.username}
            onChange={(e) => onChange('username', e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded border border-slate-300 p-2 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            placeholder="Password"
            value={values.password1}
            onChange={(e) => onChange('password1', e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded border border-slate-300 p-2 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            placeholder="Ulangi Password"
            value={values.password2}
            onChange={(e) => onChange('password2', e.target.value)}
          />
          <select
            className="w-full rounded border border-slate-300 p-2 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            value={values.role}
            onChange={(e) => onChange('role', e.target.value)}
          >
            <option value="guest">Guest</option>
            <option value="operator">Operator</option>
            <option value="engineer">Engineer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-700"
          >
            Batal
          </button>
          <button
            onClick={onSubmit}
            className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
