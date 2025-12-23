## ✅ Rekomendasi Utama (Final & Terintegrasi)

Berikut adalah **daftar tunggal dan terstruktur** dari semua rekomendasi yang relevan untuk meningkatkan sistem `Mx-Core` secara keseluruhan:

---

### 1. **Implementasi Login & Autentikasi**

- Gunakan **NextAuth.js (Auth.js)** di `apps/frontend` untuk login berbasis email/password atau SSO.
- Buat halaman `/login` dan redirect jika tidak login.
- Simpan session menggunakan cookie atau JWT.

📌 _Kenapa penting_: Agar role pengguna tidak hardcoded (`currentRole`), dan sistem jadi aman.

---

### 2. **Ambil Role Secara Dinamis dari Session**

- Gantikan konstanta `currentRole: UserRole = 'Foreman'` dengan `session?.user?.role`.
- Gunakan hook seperti `useSession()` atau `getServerSession()`.

📌 _Kenapa penting_: Role harus terverifikasi, bukan manipulasi frontend.

---

### 3. **Tambahkan Middleware Autentikasi**

- Buat `middleware.ts` di `apps/frontend` untuk memproteksi route dari user yang belum login.
- Redirect user yang belum login ke `/login`.

📌 _Kenapa penting_: Mencegah akses langsung ke halaman plugin/platform tanpa autentikasi.

---

### 4. **Validasi & Fallback untuk plugin-manifest.json**

- Validasi struktur plugin (misalnya wajib ada `name`, `basePath`, `description`).
- Tambahkan fallback/backup jika fetch gagal (misalnya simpan ke `localStorage`).

📌 _Kenapa penting_: Plugin tidak muncul jika file rusak — bisa fatal di produksi.

---

### 5. **Jadikan Komponen Plugin Reusable**

- Bungkus UI plugin card jadi satu komponen misalnya `PluginCard.tsx`.
- Terima props: `name`, `emoji`, `description`, `href`.

📌 _Kenapa penting_: Untuk skalabilitas dan keterbacaan kode.

---

### 6. **Tambahkan RBAC di Backend/API**

- Pastikan bukan hanya UI yang membatasi aksi berdasarkan role.
- Tambahkan pengecekan role di API route atau controller saat melakukan aksi (misal assign KPI).

📌 _Kenapa penting_: UI bisa dimanipulasi, backend harus tetap memverifikasi hak akses.

---

### 7. **Perkuat Error Handling di UI**

- Gunakan komponen `Alert` atau `Toast` untuk error (bukan hanya `<div>` merah).
- Tambahkan error boundaries atau try-catch lebih jelas.

📌 _Kenapa penting_: Meningkatkan UX saat plugin gagal dimuat atau data tidak tersedia.

---

### 8. **Audit dan Restrukturisasi Folder**

- Pisahkan folder `components`, `lib`, `hooks`, `auth`, dan `types` agar lebih maintainable.
- Gunakan alias path di `tsconfig.json` (`@components/...`, `@lib/...`, dst).

📌 _Kenapa penting_: Struktur rapi = produktivitas tim tinggi.

---

### 9. **Optimasi Visual Plugin**

- Tambahkan status plugin: aktif/nonaktif, badge versi, dll.
- Mungkin tampilkan ikon dari metadata atau kategori warna tertentu.

📌 _Kenapa penting_: Meningkatkan tampilan profesional dan memudahkan identifikasi plugin.

---

### 10. **Gunakan Context Provider untuk Auth (Opsional)**

- Bungkus `HomePageClient` dengan `AuthProvider` jika tidak pakai NextAuth.
- Context bisa menyimpan session, role, dan user info.

📌 _Kenapa penting_: Supaya tidak perlu prop drilling atau state lokal yang kompleks.

---

## 🧾 Ringkasan

| #   | Area                      | Status Saat Ini     |
| --- | ------------------------- | ------------------- |
| 1   | Login & Session           | ❌ Belum ada        |
| 2   | Role Dinamis dari Session | ❌ Hardcoded        |
| 3   | Middleware Auth           | ❌ Belum dibuat     |
| 4   | Plugin Manifest Validasi  | ❌ Belum ada        |
| 5   | Komponen Plugin Reusable  | ❌ Belum dibuat     |
| 6   | RBAC di Backend           | ❓ Tidak diketahui  |
| 7   | Error Handling UI         | ❌ Sederhana sekali |
| 8   | Struktur Folder Modular   | ❌ Belum optimal    |
| 9   | UI Visual Plugin          | ❌ Belum interaktif |
| 10  | Auth Provider (opsional)  | ❌ Belum digunakan  |

---

## 🎯 Rekomendasi Eksekusi (Prioritas)

1. **Login dan session** dulu.
2. Baru ambil **role dari session**.
3. Setelah itu, kunci akses via **middleware**.
4. Lanjutkan ke **validasi plugin dan refactor UI**.
5. Audit backend untuk **RBAC yang benar**.
