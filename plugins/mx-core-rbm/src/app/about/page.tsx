// plugins/mx-core-rbm/src/app/about/page.tsx

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-12 px-4 py-8">
      <section>
        <h1 className="mb-4 text-3xl font-bold">Tentang Proyek</h1>
        <p className="text-lg">
          <strong>mx-core-rbm</strong> adalah <em>sub-project</em> dari{' '}
          <strong>mx-core</strong>, yang berperan sebagai bagian integral dalam
          membangun sistem manajemen pemeliharaan berbasis data dan risiko.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">
          🎯 Visi dan Tujuan Bisnis
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            Menyediakan sistem <strong>pengambilan keputusan strategis</strong>{' '}
            dalam perencanaan pemeliharaan berbasis data.
          </li>
          <li>
            Meningkatkan <strong>keandalan dan efisiensi biaya</strong> dengan
            mengidentifikasi aset yang kritis dan menentukan jenis perawatan
            yang tepat.
          </li>
          <li>
            Menstandarkan pendekatan <strong>RBM yang digunakan PT PON</strong>{' '}
            ke dalam bentuk sistem digital modular.
          </li>
          <li>
            Memungkinkan <strong>integrasi lintas sistem</strong> seperti CMMS,
            IoT monitoring, dan dashboard manajerial.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">
          👥 Stakeholders dan Peran
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 text-left text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Stakeholder</th>
                <th className="border px-4 py-2">Peran & Kebutuhan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-medium">
                  Reliability Engineer
                </td>
                <td className="border px-4 py-2">
                  Melakukan ESC grading dan evaluasi risiko
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">
                  Maintenance Planner
                </td>
                <td className="border px-4 py-2">
                  Membuat strategi pemeliharaan dan rencana TBM
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">
                  Maintenance Scheduler
                </td>
                <td className="border px-4 py-2">
                  Menjadwalkan dan mengeksekusi pemeliharaan
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Inspector</td>
                <td className="border px-4 py-2">
                  Melakukan evaluasi dan input histori perawatan
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">IT/CMMS Admin</td>
                <td className="border px-4 py-2">
                  Menyiapkan integrasi dan sinkronisasi ke CMMS
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">
                  Supervisor / Manager
                </td>
                <td className="border px-4 py-2">
                  Melihat laporan, KPI, dan insight untuk pengambilan keputusan
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">
          📌 Kebutuhan Bisnis Tingkat Tinggi
        </h2>
        <ol className="list-inside list-decimal space-y-2">
          <li>
            Sistem dapat melakukan <strong>penilaian risiko</strong> berdasarkan
            aspek ESC.
          </li>
          <li>
            Sistem dapat menghasilkan <strong>klasifikasi kritikalitas</strong>{' '}
            aset.
          </li>
          <li>
            Sistem dapat menyusun <strong>strategi pemeliharaan</strong>{' '}
            berdasarkan hasil evaluasi risiko.
          </li>
          <li>
            Sistem dapat menghasilkan <strong>jadwal TBM hybrid</strong> jika
            diperlukan.
          </li>
          <li>
            Sistem menyediakan <strong>dashboard</strong> dan visualisasi
            kondisi aset.
          </li>
          <li>
            Sistem dapat <strong>mengekspor data</strong> ke CMMS atau sistem
            lain.
          </li>
        </ol>
      </section>
    </main>
  );
}
