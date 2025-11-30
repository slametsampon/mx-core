# 🔐 Panduan RBAC untuk Plugin MX Core

---

Menyediakan _pedoman resmi_ untuk developer plugin eksternal agar:

- Deklarasi RBAC **konsisten** dan **tidak ambigu**
- Mengetahui nilai-nilai valid untuk `role`, `resource`, dan `action`
- Mengetahui **struktur `plugin.json`**
- Bisa melihat **contoh konkret**

---

## 📁 **Lokasi:**

```
/plugins/mx-core-docs/content/rbac.mdx
```

> Jika belum ada, buat folder dan file tersebut sekarang.

---

## 📝 Contoh Isi Awal `rbac.mdx`

````mdx
Plugin dapat mendaftarkan _permissions_ agar UI dan backend hanya memperbolehkan akses pengguna dengan role yang sesuai.

---

## 📦 Struktur `plugin.json`

File `plugin.json` harus berada di dalam root direktori plugin:

```json
{
  "name": "mx-core-iot",
  "basePath": "/iot",
  "description": "Monitoring sensor IoT",
  "rbac": [
    { "role": "Engineer", "resource": "device", "action": "read" },
    { "role": "Supervisor", "resource": "device", "action": "assign" }
  ]
}
```
````

---

## 👥 Daftar `UserRole` yang Valid

Tipe ini didefinisikan dalam `@mx-core/types`:

```ts
export type UserRole =
  | 'Admin'
  | 'Manager'
  | 'Supervisor'
  | 'Operator'
  | 'Foreman'
  | 'Engineer'
  | 'Viewer';
```

---

## ⚙️ Daftar `RBACAction` yang Valid

```ts
export type RBACAction =
  | 'read'
  | 'write'
  | 'assign'
  | 'validate'
  | 'approve'
  | 'delete'
  | 'analyze';
```

---

## 📘 Contoh dari `mx-core-cmms`

```json
"rbac": [
  { "role": "Operator", "resource": "asset", "action": "read" },
  { "role": "Foreman", "resource": "maintenance", "action": "assign" },
  { "role": "Manager", "resource": "maintenance", "action": "approve" }
]
```

---

## 🧩 Tips Penggunaan

- Gunakan `canAccess(context)` dari `@mx-core/core/rbac` untuk memverifikasi permission
- Gunakan komponen `<CanAccess />` dari `@mx-core/ui` di level UI

```tsx
<CanAccess role="Supervisor" resource="kpi" action="validate">
  <ValidateButton />
</CanAccess>
```

---

## ❓ FAQ

### Bagaimana jika `plugin.json` tidak memiliki properti `rbac`?

RBAC dianggap kosong. Tidak ada rule baru yang ditambahkan oleh plugin tersebut.

---

---

## 🧪 Verifikasi

- Jalankan `npm run dev` pada `apps/frontend`
- Akses `http://localhost:3000/docs/rbac` (atau sesuai routing Contentlayer Anda)
- Pastikan format tampil, dan bisa dibaca dengan baik

---

## 📌 Langkah Lanjut (Opsional)

- Tambahkan TOC (table of contents)
- Validasi schema `plugin.json` otomatis saat load
- Tambahkan gambar atau diagram (jika pakai MDX + remark plugins)

---
