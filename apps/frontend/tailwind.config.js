// apps/frontend/tailwind.config.ts
const config = {
    content: [
        './app/**/*.{ts,tsx,js,jsx}',
        '../../plugins/mx-core-docs/src/**/*.{ts,tsx}', // ✅ tetap sertakan plugin
    ],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
export default config;
