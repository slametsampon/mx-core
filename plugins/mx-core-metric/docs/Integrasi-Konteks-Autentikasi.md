# **"Integrasi Konteks Autentikasi & RBAC antara Host dan Plugin (Monorepo MX-Core)"**

---

## 🎯 **Tujuan Utama:**

Mengintegrasikan sistem autentikasi dan RBAC dari **frontend host (mx-core-frontend)** ke **plugin independen** seperti `mx-core-metric`, secara aman, minimalis, dan fleksibel — berbasis komunikasi antar-iframe (`postMessage`) dan context React.

---

## ✅ **Lima Langkah Implementasi Utama**

---

### **1. Definisi Minimal `UserContext` di Plugin (Child)**

> 🔑 Tujuan: Mewakili informasi user yang dikirim dari host secara aman dan cukup untuk evaluasi hak akses.

**Struktur data minimal:**

```ts
type UserContext = {
  username: string;
  role: 'guest' | 'operator' | 'engineer' | 'supervisor' | 'manager' | 'admin';
  avatarUrl?: string;
  token?: string; // optional
};
```

**Catatan penting:**

- Jangan bawa password / info sensitif
- Token hanya diperlukan jika plugin perlu call API

---

### **2. Setup `AuthContextProvider` dan HOC `withAuthContext()` di Plugin**

> 🎁 Tujuan: Memberikan konteks `user` ke seluruh komponen dalam plugin, tanpa harus mengoper manual.

**Struktur (konsepual):**

- `AuthContext`: React Context untuk `UserContext`
- `AuthContextProvider`: Komponen pembungkus root app di plugin
- `withAuthContext()`: HOC opsional untuk inject context ke komponen fungsional

**Cara kerja:**

- Pada awal load, `AuthContextProvider` menunggu pesan dari host via `postMessage`
- Setelah data user diterima, context di-_update_

---

### **3. Komunikasi Host → Plugin via `postMessage`**

> 🔄 Tujuan: Kirim data user dari `mx-core-frontend` ke plugin saat iframe dimuat.

**Mekanisme:**

- Host frontend (parent) mengirim data ke plugin iframe dengan:

  ```js
  iframe.contentWindow.postMessage({ type: 'auth', user }, '*');
  ```

- Plugin mendengarkan `window.addEventListener('message', ...)`

  - Jika `event.data.type === 'auth'`, simpan ke context

**Keamanan:**

- Validasi asal pesan (origin) sebelum menerima
- Hindari menerima selain tipe `auth`

---

### **4. Gunakan Context di Plugin untuk Kendali Akses**

> 🔐 Tujuan: UI & logic plugin mengikuti hak akses (RBAC) user

**Contoh penggunaan:**

```ts
const { user } = useAuthContext();

if (user?.role === 'engineer') {
  // Tampilkan tombol analisis
}
```

**Validasi Akses**:

- Bisa cocokkan `role` dengan plugin.json `rbac`
- Plugin tetap boleh hardcode role→fitur, selama tetap minimal

---

### **5. Pengelolaan Logout (Indirek)**

> 🚪 Tujuan: Konsistensi logout hanya dilakukan dari **frontend host**

**Prinsip:**

- Plugin **tidak mengelola login/logout sendiri**
- Jika user logout di host, plugin:

  - Dikirimi user kosong `{ username: 'Guest', role: 'guest' }`
  - Atau dikirim sinyal `logout` via postMessage

**Respons plugin:**

- Reset context user
- Navigasi ulang ke halaman home plugin atau tampilkan "akses dibatasi"

---

## 📦 Tambahan: Struktur Direktori (Opsional)

```
mx-core-metric/
├─ src/
│  ├─ context/AuthContext.tsx
│  ├─ hooks/useAuthContext.ts
│  ├─ hoc/withAuthContext.tsx
│  ├─ utils/rbac.ts
│  └─ ...
```
