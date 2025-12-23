// apps/frontend/app/about/page.tsx

export const metadata = {
  title: 'Tentang Mx-Core',
  description:
    'Pelajari lebih lanjut tentang platform modular Mx-Core dan peran pentingnya dalam membangun solusi digital industri.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">Tentang Mx-Core</h1>

      <section className="space-y-6 text-base leading-relaxed text-gray-700">
        <section className="space-y-6 text-base leading-relaxed text-gray-700">
          <p>
            <strong>Mx-Core</strong> adalah platform digital berbasis{' '}
            <em>plugin</em> yang dirancang khusus untuk mendukung kebutuhan
            industri dalam membangun solusi digital secara modular. Sistem ini
            mendukung berbagai fungsi seperti:
          </p>

          <ul className="list-inside list-disc text-gray-700">
            <li>📊 Monitoring KPI</li>
            <li>📚 Dokumentasi Teknis</li>
            <li>🛠️ Manajemen Pemeliharaan (CMMS)</li>
            <li>🔁 Reliability-Based Maintenance (RBM)</li>
            <li>🤖 Integrasi Kecerdasan Buatan (AI)</li>
          </ul>

          <p>
            Dengan pendekatan <strong>modular dan fleksibel</strong>, setiap
            fitur dikembangkan...
          </p>

          {/* Lanjutkan konten berikutnya */}
        </section>

        <p>
          Dengan pendekatan <strong>modular dan fleksibel</strong>, setiap fitur
          dikembangkan sebagai <code>plugin</code> yang berdiri sendiri. Ini
          memungkinkan tim untuk menambah, mengubah, atau menghapus fitur tanpa
          mengganggu sistem inti.
        </p>

        <p>
          Mx-Core juga dilengkapi dengan{' '}
          <strong>kontrol akses berbasis peran (RBAC)</strong>, sehingga hanya
          pengguna yang memiliki izin yang dapat mengakses fungsi tertentu —
          memastikan keamanan dan integritas data di setiap level.
        </p>

        <p>
          Proses integrasi plugin dilakukan secara otomatis melalui sistem
          manifest, menjadikan deployment cepat dan minim konfigurasi manual.
        </p>

        <p>
          Singkatnya, <strong>Mx-Core</strong> adalah fondasi ideal bagi
          perusahaan industri yang ingin membangun ekosistem aplikasi digital
          secara efisien, terukur, dan aman.
        </p>
      </section>
    </main>
  );
}
