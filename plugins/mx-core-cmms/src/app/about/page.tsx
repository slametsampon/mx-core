// plugins/mx-core-cmms/src/app/about/page.tsx

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-12 px-4 py-8">
      <section>
        <h1 className="mb-4 text-3xl font-bold">Tentang Proyek</h1>
        <p className="text-lg">
          <strong>mx-core-cmms</strong> adalah <em>sub-project</em> dari{' '}
          <strong>mx-core</strong>, yang berperan sebagai sistem operasional
          untuk pengelolaan pemeliharaan aset secara terstruktur melalui work
          order digital, jadwal preventive maintenance, dan histori perawatan
          aset.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">
          🎯 Visi dan Tujuan Bisnis
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            Menyediakan sistem <strong>manajemen pemeliharaan aset</strong>{' '}
            berbasis digital dan modular.
          </li>
          <li>
            Mengurangi <strong>downtime dan kegagalan mesin</strong> melalui
            penjadwalan preventive maintenance.
          </li>
          <li>
            Menyediakan histori perawatan yang{' '}
            <strong>terstruktur dan terdokumentasi</strong>.
          </li>
          <li>
            Memungkinkan integrasi dengan <strong>data risiko (RBM)</strong>,
            <strong>IoT sensor</strong>, dan <strong>AI prediktif</strong> untuk
            auto-WO.
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
                <td className="border px-4 py-2 font-medium">Technician</td>
                <td className="border px-4 py-2">
                  Mengerjakan WO yang ditugaskan dan mengisi laporan hasil
                  perawatan.
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Planner</td>
                <td className="border px-4 py-2">
                  Menyusun jadwal PM dan membuat WO berdasarkan kebutuhan
                  lapangan.
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Supervisor</td>
                <td className="border px-4 py-2">
                  Memantau status WO dan menyetujui tindakan perawatan.
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Engineer</td>
                <td className="border px-4 py-2">
                  Menganalisis histori pemeliharaan dan efektivitas WO.
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">IT/CMMS Admin</td>
                <td className="border px-4 py-2">
                  Menyediakan akses pengguna, mengatur RBAC, dan memastikan
                  integrasi plugin aktif.
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Manager</td>
                <td className="border px-4 py-2">
                  Melihat laporan status pemeliharaan dan kinerja teknisi.
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
            Sistem dapat{' '}
            <strong>membuat, mengedit, dan menghapus Work Order</strong> secara
            digital.
          </li>
          <li>
            Sistem dapat <strong>menjadwalkan Preventive Maintenance</strong>{' '}
            berdasarkan aset dan interval.
          </li>
          <li>
            Sistem menyimpan dan menampilkan{' '}
            <strong>histori pemeliharaan aset</strong>.
          </li>
          <li>
            Sistem mendukung <strong>akses berbasis peran (RBAC)</strong> dan
            audit log.
          </li>
          <li>
            Sistem terintegrasi dengan <strong>data aset dari RBM</strong> dan
            menerima input dari plugin AI / IoT.
          </li>
          <li>
            Sistem dapat <strong>menyediakan data work order</strong> untuk
            dashboard performa maintenance.
          </li>
        </ol>
      </section>
    </main>
  );
}
