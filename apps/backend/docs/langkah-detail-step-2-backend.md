# **Step-2 : Siapkan Database Postgres untuk mx-core-backend**

## **1. Tujuan Step-2**

- Backend tidak lagi tergantung **in-memory/json**
- Data real disimpan di **Postgres**
- Semua endpoint `/api/...` tetap sama sehingga mx-core-metric bisa langsung konsumsi tanpa ubahan
- Data awal langsung tersedia (melalui **seeding** dari JSON existing)

---

## **2. Persiapan Infrastruktur (Vercel)**

1. Buka **Project: mx-core-backend** pada Vercel
2. Masuk tab **Storage**
3. Tambah **Postgres → Create**
4. Setelah dibuat, salin connection string (misal: `POSTGRES_URL`)
5. Tambahkan di **Environment Variables**

   ```
   DATA_MODE=postgres
   DATABASE_URL=<copas dari vercel>
   ```

Catatan penting:

- “backend” yang connect ke database, bukan frontend
- DataMode tetap bisa dipilih (fallback ke memory/json jika diperlukan testing)

---

## **3. Siapkan Struktur Database (Schema)**

Tujuannya menampung data berikut:

- department
- unit
- kpi_record
- user
- kpi_target_annual

Langkah:

1. Buat **draft schema** (SQL) di dalam project backend (misal `/db/schema.sql`)
2. Isi sesuai field yang sudah berjalan
3. Pastikan foreign key antar tabel disiapkan
4. Pastikan PK department & unit tetap **string** (supaya kompatibel dengan JSON sekarang)

Prinsip:

- Tidak mengubah struktur JSON lama
- Tidak memaksakan auto-number

---

## **4. Jalankan Schema ke Database**

1. Jalankan perintah **init database** (manual)
2. Pastikan semua tabel terbentuk dengan benar
3. Cek via Vercel → SQL Editor

Catatan:

- Ini **satu kali** untuk initial DB
- Setelah selesai, backend bisa mulai baca/insert

---

## **5. SEEDING DATA awal dari JSON (sangat penting)**

Tujuan:

- Saat pertama kali backend connect ke Postgres, tabel tidak kosong
- Tampilan mx-core-metric langsung muncul data seperti selama ini

Langkah konsep:

1. Ambil semua file JSON existing (department, unit, dst)
2. Buat fungsi seeding:

   - hanya dieksekusi **jika tabel kosong**

3. Insert data JSON ke Postgres
4. Tandai bahwa seeding sudah dilakukan (opsional: based on row count)

Prinsip:

- **Tidak mengganti JSON**
- **Tidak mengubah struktur data**
- UI tetap jalan karena API masih memberikan data yang sama

---

## **6. Konfigurasi MODE**

Tambahkan env di Vercel backend:

```
DATA_MODE=postgres
```

Keuntungan:

- Saat deploy, backend otomatis mengarah ke Postgres
- Tidak perlu mengubah kode frontend

Fallback:

- Jika backend error, set sementara ke `DATA_MODE=json` atau `memory`

---

## **7. Testing setelah deploy**

1. Buka:

   ```
   https://mx-core-backend.vercel.app/api/department
   ```

2. Pastikan data muncul **dari Postgres**
3. Buka UI mx-core-metric
4. Pastikan semua page menampilkan data sama seperti sebelumnya

---

## **8. Dampak terhadap pipeline (CPM/Maintenance)**

- Data KPI yang selama ini ditampilkan via JSON sudah langsung tersimpan di DB
- Saat nanti CPM atau Turn Around ingin query data KPI berdasarkan periode, nanti sudah siap

---

# **Summary point penting**

| Langkah          | Output                    |
| ---------------- | ------------------------- |
| Buat Postgres    | DB tersedia               |
| Tambah env       | Backend bisa connect      |
| Buat schema      | Struktur data stabil      |
| Init Schema      | Tabel siap                |
| Seeding JSON     | Data awal langsung tampil |
| Mode = postgres  | Backend real database     |
| Testing endpoint | UI langsung terbaca       |

---

# **Checklist implementasi cepat**

- [ ] Buat database
- [ ] Tambah env
- [ ] Buat schema
- [ ] Init schema
- [ ] Tambah fungsi seeding
- [ ] Deploy backend
- [ ] Test endpoint
- [ ] Confirm UI tampil

---

# **Setelah Step-2 selesai**

Seluruh fitur yang sekarang tampil (department, unit, KPI record) akan langsung baca dari DB, sehingga nanti bisa:

- manajemen data via UI (CRUD)
- analisa KPI (MTBF, MTTR, downtime, reliability)
- integrasi CPM & Turn Around monitoring

---
