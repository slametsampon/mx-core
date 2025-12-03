// plugins/mx-core-metric/src/config.ts

export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export function logTrace(context: string, message: string, data?: any) {
  console.log(
    `%c[${context}] ${message}`,
    'color: #4f46e5; font-weight: bold;'
  );
  if (data !== undefined) {
    console.log('↳ payload:', data);
  }
}

// 🔽 Tambahkan ini
console.info(
  '%c[CONFIG] MODE:',
  'color: orange; font-weight: bold;',
  USE_MOCK ? '🧪 MOCK' : '🌐 LIVE API'
);
console.info('%c[CONFIG] API_BASE:', 'color: teal;', API_BASE);
