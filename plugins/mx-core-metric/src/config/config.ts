// plugins/mx-core-metric/src/config/config.ts

// 🌐 Mode konfigurasi: true jika pakai mock data
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

// 🛠️ Logger untuk konfigurasi awal
console.info(
  '%c[CONFIG] MODE:',
  'color: orange; font-weight: bold;',
  USE_MOCK ? '🧪 MOCK' : '🌐 LIVE API'
);
console.info('%c[CONFIG] API_BASE:', 'color: teal;', API_BASE);

// 📦 Fungsi utilitas: Logging umum dari komponen frontend
export function logTrace(context: string, message: string, data?: any) {
  console.log(
    `%c[${context}] ${message}`,
    'color: #4f46e5; font-weight: bold;'
  );
  if (data !== undefined) {
    console.log('↳ payload:', data);
  }
}

// 🧭 Logging tambahan khusus frontend untuk status/debug
export function logFrontendStatus(
  context: string,
  message: string,
  data?: any
) {
  console.info(`%c[${context}]`, 'color: blue; font-weight: bold;', message);
  if (data !== undefined) {
    console.info('↳ payload:', data);
  }
}
