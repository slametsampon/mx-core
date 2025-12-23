// apps/frontend/components/LoginForm.tsx

'use client';

import React from 'react';
import CustomLink from './CustomLink';

interface LoginFormProps {
  values: {
    username: string;
    password: string;
    remember: boolean;
    showPassword: boolean;
  };
  loading?: boolean;
  error?: string;
  onChange: (field: string, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleRegister: () => void;
}

export function LoginForm({
  values,
  loading,
  error,
  onChange,
  onSubmit,
  onToggleRegister,
}: LoginFormProps) {
  return (
    <form className="px-8 pb-8 pt-6" onSubmit={onSubmit}>
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <label
        htmlFor="userName"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Username
      </label>
      <input
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 pr-10"
        placeholder="yourname"
        autoComplete="username"
        value={values.username}
        onChange={(e) => onChange('username', e.target.value)}
      />

      <label
        htmlFor="password"
        className="mb-2 mt-4 block text-sm font-medium text-slate-700"
      >
        Password
      </label>
      <div className="relative mb-4">
        <input
          type={values.showPassword ? 'text' : 'password'}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 pr-12"
          placeholder="••••••••"
          autoComplete="current-password"
          value={values.password}
          onChange={(e) => onChange('password', e.target.value)}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
          onClick={() => onChange('showPassword', !values.showPassword)}
        >
          {values.showPassword ? '🙈' : '👁️'}
        </button>
      </div>

      <div className="mb-5 flex justify-between text-sm">
        <label className="inline-flex items-center gap-2 text-slate-600">
          <input
            type="checkbox"
            checked={values.remember}
            onChange={(e) => onChange('remember', e.target.checked)}
            className="rounded-md border-slate-300"
          />
          Ingat saya
        </label>
        <CustomLink
          href="/forgot-password"
          className="text-sm text-emerald-600 underline hover:text-emerald-700"
        >
          Lupa password?
        </CustomLink>{' '}
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-600 py-2.5 text-white hover:bg-emerald-700 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? '⏳ Memproses…' : 'Masuk'}
      </button>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs uppercase text-slate-400">atau</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        className="w-full rounded-xl border border-blue-600 bg-white py-2.5 text-slate-700 hover:bg-slate-100"
        onClick={onToggleRegister}
      >
        🧪 Belum punya akun? Daftar di sini
      </button>
    </form>
  );
}
