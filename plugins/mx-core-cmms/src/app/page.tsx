// plugins/mx-core-cmms/src/app/page.tsx

import CustomLink from '@/components/CustomLink';
import { features } from '@/data/features';

export const metadata = {
  title: 'Beranda | CMMS',
  description:
    'Dashboard CMMS (Computerized Maintenance Management System) untuk pengelolaan work order, preventive maintenance, dan histori aset.',
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-16 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-5xl space-y-6 text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          CMMS Core
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
          Sistem <strong>Computerized Maintenance Management</strong> untuk
          mengelola work order, menjadwalkan preventive maintenance, dan
          melacak histori pemeliharaan aset secara digital dan terintegrasi.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <CustomLink
            href="/dashboard"
            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Masuk ke Dashboard
          </CustomLink>
          <CustomLink
            href="/about"
            className="rounded-md border border-blue-600 px-6 py-3 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Tentang CMMS
          </CustomLink>
        </div>
      </section>

      {/* Fitur Utama */}
      <section className="mx-auto mt-24 max-w-5xl px-4 text-center">
        <h2 className="mb-8 text-2xl font-semibold">Fitur Unggulan</h2>
        <div className="grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-lg bg-gray-100 p-4 shadow-sm transition hover:shadow-md dark:bg-gray-800"
            >
              <div className="mb-2 text-3xl">{f.icon}</div>
              <h3 className="mb-1 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-24 px-4 text-center">
        <h2 className="mb-4 text-2xl font-semibold">
          Siap Mengelola Work Order dan Jadwal Maintenance Secara Efisien?
        </h2>
        <p className="mx-auto mb-6 max-w-xl text-gray-600 dark:text-gray-400">
          Gunakan CMMS Core untuk meningkatkan keandalan aset, mempercepat eksekusi
          work order, dan memastikan preventive maintenance berjalan tepat waktu.
        </p>
        <CustomLink
          href="/dashboard"
          className="rounded-md bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >
          Buka Dashboard
        </CustomLink>
      </section>
    </main>
  );
}
