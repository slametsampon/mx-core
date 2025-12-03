Baik, berikut adalah **langkah-langkah rinci, terstruktur, dan berurutan** untuk menyelesaikan **Tahap 2: Dynamic Form + Viewer**, termasuk **cara verifikasi** dan **checklist status akhir**.

---

## ✅ **Tujuan Akhir Tahap 2**

- Dynamic form yang bisa digunakan untuk semua model.
- Validasi ketat, tombol rapi, dan support relasi antar model.
- Bisa berjalan pada mode `mock` atau `live` (konfigurasi dari `.env`).

---

## 🧭 **Langkah-Langkah Penyelesaian Tahap 2 (Detail & Urut)**

### 1. ✅ **Perbaiki Validasi Form per Field**

**Masalah saat ini:** Validasi hanya pakai `zod.safeParse`, tapi tidak tampilkan error di UI.

#### Langkah:

- Tambahkan state `formErrors` untuk menyimpan pesan error per field.
- Setelah `safeParse`, jika gagal → isi `formErrors`.
- Render pesan error kecil di bawah setiap field.

#### Contoh:

```tsx
{
  formErrors[field.key] && (
    <p className="text-sm text-red-600">{formErrors[field.key]}</p>
  );
}
```

#### Verifikasi:

- Coba klik **Simpan** tanpa isi form → pastikan pesan error muncul per field.

---

### 2. ✅ **Relasi antar model → Dropdown Dinamis**

**Masalah saat ini:** Dropdown seperti `unit_id`, `kpi_id` gagal fetch jika `mocks/*.json` belum ada → muncul 404.

#### Langkah:

- Tambahkan fungsi `loadRelationalData(modelKey)` → fetch ke `mockService` model lain.
- Tangani error fetch jika file tidak ditemukan, misalnya return `[]`.

#### Contoh:

```ts
try {
  return await fetchModel(modelName); // ex: unit, kpi
} catch {
  return []; // fallback kalau file mock tidak ada
}
```

#### Verifikasi:

- Tambahkan dropdown field `unit_id`, `kpi_id`.
- Pastikan opsi muncul dari file mock `/mocks/unit.json`, dll.
- Jika tidak ada file → tidak error (hanya dropdown kosong).

---

### 3. ✅ **Percantik Tombol Aksi (Cancel, Simpan, Update)**

#### Langkah:

- Gunakan Tailwind Utility Classes:

```tsx
<button className="rounded bg-gray-100 text-gray-700 hover:bg-gray-200">
  Batal
</button>
<button className="ml-auto rounded bg-blue-600 text-white hover:bg-blue-700">
  Simpan / Update
</button>
```

- Tampilkan **Batal** hanya di mode edit (`initialData?.id`).

#### Verifikasi:

- Pastikan tampilan form clean & tombol proporsional.
- Tombol update muncul saat edit, tombol batal berfungsi memanggil `onCancel`.

---

### 4. ✅ **Support Switch Mode (mock/live) dari `.env`**

#### Langkah:

- Tambahkan di `.env.local`:

```env
MODE=mock
```

- Gunakan `process.env.MODE` di `mockService` atau `apiService`.

- Buat abstraksi `dataService.ts`:

```ts
export const dataService = MODE === 'mock' ? mockService : apiService;
```

#### Verifikasi:

- Jalankan `npm run dev` dengan `MODE=mock` → gunakan file JSON.
- Ubah ke `live` → pastikan fetch ke API (nanti di Tahap 3).

---

### 5. ✅ **Fallback Memori (opsional)**

Jika disepakati sebelumnya: simpan data ke memori JS daripada localStorage → agar file `/mocks/*.json` bisa selalu di-load saat model berubah.

#### Langkah:

- Tambahkan `const cache: Record<string, any[]> = {};` di atas.
- Saat `getAll()`, periksa `cache[model]`.
- Jika belum ada → fetch file dan simpan ke `cache[model]`.

#### Verifikasi:

- Refresh halaman → tetap baca file JSON saat model berubah.
- Tambahkan data di file JSON → muncul saat reload.

---

## 📌 **Checklist Akhir Tahap 2**

| Task                                                 | Status     | Keterangan                    |
| ---------------------------------------------------- | ---------- | ----------------------------- |
| ✅ Generic form builder semua model                  | Selesai    | `DynamicForm` adaptif         |
| ✅ Switch antara mock / live mode                    | Selesai    | via `.env MODE=`              |
| ✅ Validasi field (tidak boleh kosong)               | Selesai    | Per field error message       |
| ✅ Relasi antar model (dropdown `unit_id`, `kpi_id`) | Selesai    | Bisa render opsi              |
| ✅ Percantik tombol aksi (Cancel, Simpan, Update)    | Selesai    | Dengan style konsisten        |
| ✅ Fallback ke mock jika local kosong / invalid      | Selesai    | Sudah ada mekanisme           |
| ✅ Gunakan cache memori (opsional)                   | Disarankan | Hindari localStorage permanen |

---

## ✅ **Kesimpulan**

Dengan langkah-langkah di atas dijalankan dan diverifikasi satu per satu, maka **Tahap 2 dapat dianggap selesai secara menyeluruh** dan siap masuk ke **Tahap 3: Integrasi API Backend**.

Jika Anda ingin saya bantu checklist **dalam format markdown/gambar**, saya siap bantu.
