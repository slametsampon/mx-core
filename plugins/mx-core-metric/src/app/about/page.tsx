// src/app/about/page.tsx

export const metadata = {
  title: 'Tentang | Metricube',
  description:
    'Informasi tentang aplikasi Metricube – platform monitoring KPI dan gangguan maintenance berbasis web dan IoT.',
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-6 text-gray-800 dark:text-gray-200">
      {/* Judul */}
      <h1 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        Tentang Metricube
      </h1>

      {/* Deskripsi singkat */}
      <p className="text-lg mb-6">
        <strong>Metricube</strong> adalah platform digital yang dirancang untuk
        membantu tim <span className="font-semibold">Maintenance Plant</span>{' '}
        dalam memantau dan mengevaluasi performa operasional melalui Key
        Performance Indicators (KPI) serta mencatat gangguan produksi
        (disturbance) secara real-time dan historis.
      </p>

      {/* Tujuan */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">🎯 Tujuan</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Meningkatkan efisiensi proses maintenance berbasis data.</li>
          <li>Menyediakan laporan KPI yang akurat dan terstruktur.</li>
          <li>
            Menangani dan memantau gangguan dengan lebih cepat dan efektif.
          </li>
          <li>Mendukung pengambilan keputusan berbasis performa aktual.</li>
        </ul>
      </section>

      {/* Fitur */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">🚀 Fitur Utama</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-1">Monitoring KPI</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pantau capaian KPI tahunan dan bulanan secara visual dan
              interaktif.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-1">
              Log Gangguan Produksi
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Catat gangguan internal maupun eksternal, lengkap dengan sumber
              dan durasi.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-1">Integrasi IoT & MQTT</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Data otomatis dari sensor berbasis ESP dan protokol MQTT untuk
              efisiensi maksimal.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-1">Input Manual</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dukungan input manual bagi data yang tidak terotomatisasi.
            </p>
          </div>
        </div>
      </section>

      {/* Teknologi */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">🛠️ Teknologi</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Aplikasi ini dibangun menggunakan:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-1">
          <li>Next.js 14 + App Router</li>
          <li>Tailwind CSS untuk styling UI</li>
          <li>TypeScript untuk keandalan kode</li>
          <li>IoT integration dengan ESP & MQTT</li>
          <li>Mock/real API dengan fallback</li>
        </ul>
      </section>

      {/* Penutup */}
      <section className="mt-12 text-center">
        <p className="text-md text-gray-500 dark:text-gray-400">
          Dibuat dan dikembangkan oleh{' '}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            Slamet-Sam
          </span>{' '}
          — untuk sistem maintenance yang lebih presisi, modern, dan efisien.
        </p>
      </section>
    </main>
  );
}
