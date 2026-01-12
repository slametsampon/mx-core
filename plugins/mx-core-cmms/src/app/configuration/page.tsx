// plugins/mx-core-cmms/src/app/configuration/page.tsx

export default function ConfigurationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-24 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          ⚙️ Konfigurasi Belum Tersedia
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Halaman ini akan digunakan untuk pengaturan template WO, interval PM,
          dan RBAC internal.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Sementara ini, konfigurasi masih dilakukan secara manual di level
          backend.
        </p>
      </div>
    </main>
  );
}
