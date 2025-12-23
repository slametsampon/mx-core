// apps/frontend/app/login/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { RegisterModal } from '@/components/RegisterModal';

export default function LoginPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    remember: true,
    showPassword: false,
  });

  const [registerForm, setRegisterForm] = useState({
    username: '',
    password1: '',
    password2: '',
    role: 'guest',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      username: 'admin',
      password: 'admin123',
    }));
  }, []);

  const onFormChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onRegisterChange = (field: string, value: string) => {
    setRegisterForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 👉 Logic login akan ditambahkan nanti
    setError('Belum ada logic login.');
  };

  const handleRegister = () => {
    // 👉 Logic register akan ditambahkan nanti
    setRegisterError('Belum ada logic register.');
  };

  return (
    <section className="flex min-h-[90vh] items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      {/* Container */}
      <div className="relative mx-4 w-full max-w-md rounded-3xl border bg-white shadow-xl">
        <div className="px-8 pt-8 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2" />
              <path
                d="M4 19c1.8-3 5-5 8-5s6.2 2 8 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-2xl font-extrabold text-transparent">
            Selamat Datang Kembali 👋
          </h1>
          <p className="mt-2 text-sm text-slate-600">Masuk untuk lanjut.</p>
        </div>

        <LoginForm
          values={form}
          error={error}
          loading={loading}
          onChange={onFormChange}
          onSubmit={handleLogin}
          onToggleRegister={() => setShowRegister(true)}
        />

        <div className="px-8 pb-8 text-center text-[11px] text-slate-500">
          Dengan masuk, kamu setuju pada ketentuan & privasi kami.
        </div>
      </div>

      <RegisterModal
        visible={showRegister}
        values={registerForm}
        error={registerError}
        onChange={onRegisterChange}
        onSubmit={handleRegister}
        onClose={() => setShowRegister(false)}
      />
    </section>
  );
}
