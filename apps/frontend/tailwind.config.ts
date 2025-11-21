// apps/frontend/tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}', // ✅ sesuai struktur App Router
    '../../plugins/mx-core-docs/src/**/*.{ts,tsx}', // ✅ tetap sertakan plugin
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};

export default config;
