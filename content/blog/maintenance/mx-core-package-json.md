---
title: MxCore – MonPackage.json
authors: ['sam']
date: '2025-11-16'
tags:
  [
    'Maintenance',
    'System',
    'mx-core',
    'monorepo',
    'modular',
    'dinamis-plugin',
    'Scalable',
    'package-json',
  ]
draft: false
summary: MxCore adalah sebuah platform digital berbasis plugin dinamis yang dirancang untuk kebutuhan pabrik petrokimia, kimia, energi, pupuk, serta lingkungan industri lainnya.
---

- [🔹 `/apps/frontend` (Next.js App)](#-appsfrontend-nextjs-app)
- [🔹 `/apps/backend` (Express API + Plugin Loader)](#-appsbackend-express-api--plugin-loader)
- [🔹 `/packages/models` (Shared Data Contracts)](#-packagesmodels-shared-data-contracts)
- [🔹 `/packages/core` (Kernel Plugin Loader, Logger, RBAC)](#-packagescore-kernel-plugin-loader-logger-rbac)
- [🔹 `/packages/ui` (Shared React Components)](#-packagesui-shared-react-components)
- [🔹 `/packages/utils` (Helper Functions)](#-packagesutils-helper-functions)
- [🔹 `/plugins/mxcore-<plugin>` (Modular Plugin: CMMS, IoT, AI, dsb)](#-pluginsmxcore-plugin-modular-plugin-cmms-iot-ai-dsb)
- [🔸 Root `package.json` (Workspaces \& Global Scripts)](#-root-packagejson-workspaces--global-scripts)

---

Dokumen ini mencakup:

1. Struktur dan isi `package.json` untuk setiap folder workspace
2. Penjelasan dependencies yang relevan
3. Script build/dev khusus per workspace
4. Catatan tambahan bila workspace memiliki build output (seperti `dist/`)

---

📦 Struktur File dan Isi `package.json` per Workspace

---

### 🔹 `/apps/frontend` (Next.js App)

- Struktur:

```
/apps/frontend
  package.json
  tsconfig.json
  next.config.js
  app/                ← Next.js App Router
  public/
  styles/
```

- `package.json`:

```json
{
  "name": "frontend",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.3.0",
    "@mxcore/models": "*",
    "@mxcore/ui": "*",
    "@mxcore/core": "*"
  },
  "devDependencies": {
    "typescript": "^5.2.0",
    "eslint": "^8.50.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

### 🔹 `/apps/backend` (Express API + Plugin Loader)

- Struktur:

```
/apps/backend
  package.json
  tsconfig.json
  src/
    index.ts         ← Entry point server
    routes/
    plugins/         ← Plugin discovery & registration
```

- `package.json`:

```json
{
  "name": "backend",
  "private": true,
  "scripts": {
    "dev": "ts-node-dev src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "sqlite3": "^5.1.6",
    "@mxcore/core": "*",
    "@mxcore/models": "*",
    "@mxcore/utils": "*"
  },
  "devDependencies": {
    "typescript": "^5.2.0",
    "ts-node-dev": "^2.0.0"
  }
}
```

---

### 🔹 `/packages/models` (Shared Data Contracts)

- Struktur:

```
/packages/models
  package.json
  tsconfig.json
  /cmms
  /iot
  /rbm
  /docs
  index.ts
```

- `package.json`:

```json
{
  "name": "@mxcore/models",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "exports": {
    ".": "./dist/index.js"
  },
  "devDependencies": {
    "typescript": "^5.2.0"
  }
}
```

---

### 🔹 `/packages/core` (Kernel Plugin Loader, Logger, RBAC)

- Struktur:

```
/packages/core
  package.json
  tsconfig.json
  src/
    plugin-loader.ts
    logger.ts
    auth.ts
  index.ts
```

- `package.json`:

```json
{
  "name": "@mxcore/core",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "dependencies": {
    "@mxcore/models": "*",
    "@mxcore/utils": "*"
  },
  "devDependencies": {
    "typescript": "^5.2.0"
  }
}
```

---

### 🔹 `/packages/ui` (Shared React Components)

- Struktur:

```
/packages/ui
  package.json
  tsconfig.json
  components/
    Button.tsx
    Card.tsx
  index.ts
```

- `package.json`:

```json
{
  "name": "@mxcore/ui",
  "version": "1.0.0",
  "main": "index.ts",
  "scripts": {
    "build": "tsc"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "typescript": "^5.2.0"
  }
}
```

---

### 🔹 `/packages/utils` (Helper Functions)

- Struktur:

```
/packages/utils
  package.json
  tsconfig.json
  src/
    date.ts
    string.ts
    uuid.ts
  index.ts
```

- `package.json`:

```json
{
  "name": "@mxcore/utils",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "devDependencies": {
    "typescript": "^5.2.0"
  }
}
```

---

### 🔹 `/plugins/mxcore-<plugin>` (Modular Plugin: CMMS, IoT, AI, dsb)

- Struktur (Contoh CMMS):

```
/plugins/mxcore-cmms
  package.json
  plugin.json
  tsconfig.json
  src/
    index.ts
    routes.ts
    services/
    schema/
    ui/
```

- `package.json`:

```json
{
  "name": "mxcore-cmms",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "dependencies": {
    "@mxcore/models": "*",
    "@mxcore/utils": "*"
  },
  "devDependencies": {
    "typescript": "^5.2.0"
  }
}
```

---

### 🔸 Root `package.json` (Workspaces & Global Scripts)

```json
{
  "name": "mxcore",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["apps/*", "packages/*", "plugins/*"],
  "scripts": {
    "dev": "npm run dev -w apps/frontend",
    "dev:backend": "npm run dev -w apps/backend",
    "build": "npm run build -w apps/frontend && npm run build -w apps/backend",
    "build:frontend": "npm run build -w apps/frontend",
    "build:backend": "npm run build -w apps/backend",
    "build:all": "npm run build -w @mxcore/models && npm run build -w @mxcore/core && npm run build -w @mxcore/ui && npm run build -w @mxcore/utils && npm run build",
    "clean": "rimraf **/dist",
    "lint": "eslint . --ext .ts,.tsx --fix"
  },
  "devDependencies": {
    "typescript": "^5.2.0",
    "eslint": "^8.50.0",
    "prettier": "^3.1.0",
    "rimraf": "^5.0.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "license": "MIT"
}
```

---

📌 Catatan Penting

- Semua workspace memiliki `tsconfig.json` sendiri, namun meng-extend dari root `tsconfig.base.json`.
- Pastikan semua workspace memiliki `"private": true` jika tidak akan dipublish ke npm registry.
- Plugin bersifat opsional; dapat diaktifkan melalui loader di `@mxcore/core`.
- Gunakan `npm run build -w <workspace>` untuk build spesifik.

---

Apakah Anda ingin saya lanjutkan ke:

- 📄 **Contoh isi `plugin.json` & `index.ts` untuk plugin standar**
- ⚙️ **Struktur plugin loader di `@mxcore/core` (dynamic import & register)**
- 🧪 **Integrasi testing dan linting per modul**
- 🏗️ **Template CLI untuk generate plugin baru**
