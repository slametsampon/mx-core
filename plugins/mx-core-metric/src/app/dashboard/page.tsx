// plugins/mx-core-metric/src/app/dashboard/page.tsx

export const metadata = {
  title: 'Dashboard | Metricube',
  description: 'Halaman dashboard masih dalam pengembangan.',
};

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="space-y-4 text-center">
        <div className="text-6xl">🚧</div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard Sedang Dalam Pengembangan
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kami sedang membangun fitur dashboard untuk memberikan visualisasi KPI
          & Disturbance.
          <br /> Silakan kembali lagi nanti.
        </p>
      </div>
    </main>
  );
}
