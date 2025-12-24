// apps/frontend/app/login/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/LoginForm';
import { RegisterModal } from '@/components/RegisterModal';
import { AuthService } from '@/services/auth-service'; // Pastikan path benar

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

  const router = useRouter();

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await AuthService.login(form.username.trim(), form.password);
      const nextPath = sessionStorage.getItem('next_path') || '/';
      sessionStorage.removeItem('next_path');

      router.push(nextPath);
    } catch (err: any) {
      setError(err?.message || 'Login gagal.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setRegisterError('');

    if (
      !registerForm.username ||
      !registerForm.password1 ||
      !registerForm.password2
    ) {
      setRegisterError('Semua field harus diisi.');
      return;
    }

    if (registerForm.password1 !== registerForm.password2) {
      setRegisterError('Password tidak cocok.');
      return;
    }

    try {
      await AuthService.register({
        username: registerForm.username.trim(),
        password: registerForm.password1,
        role: registerForm.role as any,
        avatarUrl: `https://i.pravatar.cc/100?u=${registerForm.username}`,
      });

      // Autofill login form setelah register
      setForm((prev) => ({
        ...prev,
        username: registerForm.username,
        password: registerForm.password1,
      }));

      setShowRegister(false);
    } catch (err: any) {
      setRegisterError(err.message || 'Registrasi gagal.');
    }
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
