// plugins/mx-core-rbm/src/config/config.ts

// 🌐 Mode konfigurasi: true jika pakai mock data
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// 🌍 Base URL API: mock atau live
export const API_BASE = USE_MOCK
  ? '/mocks' // 👉 data lokal JSON
  : process.env.NEXT_PUBLIC_API_BASE_URL || '';

// 📦 Base path schema JSON
export const SCHEMA_BASE = USE_MOCK
  ? '/schemas/asset-types'
  : `${API_BASE}/schema`;

// 🛠️ Logging awal konfigurasi
console.info(
  '%c[CONFIG] MODE:',
  'color: orange; font-weight: bold;',
  USE_MOCK ? '🧪 MOCK' : '🌐 LIVE API'
);
console.info('%c[CONFIG] API_BASE:', 'color: teal;', API_BASE);
console.info('%c[CONFIG] SCHEMA_BASE:', 'color: teal;', SCHEMA_BASE);

// 🧪 Optional: fungsi trace log (frontend only)
export function logTrace(context: string, message: string, data?: any) {
  console.log(
    `%c[${context}] ${message}`,
    'color: #4f46e5; font-weight: bold;'
  );
  if (data !== undefined) {
    console.log('↳ payload:', data);
  }
}
