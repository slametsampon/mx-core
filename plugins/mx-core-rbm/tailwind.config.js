// plugins/mx-core-rbm/tailwind.config.ts

const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

console.log('✅ tailwind.config.js loaded');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['border-primary-500', 'bg-primary-500', 'text-primary-500'],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#e0fffb',
          100: '#b3fff3',
          200: '#80ffeb',
          300: '#4dffe2',
          400: '#1affda',
          500: '#00ffe0',
          600: '#00c2a8',
          700: '#00877c',
          800: '#005f56',
          900: '#003933',
        },
        gray: colors.gray,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '85ch',
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.4'),
            },
            h3: {
              fontWeight: '600',
              marginTop: theme('spacing.5'),
              marginBottom: theme('spacing.3'),
            },
            p: {
              marginTop: theme('spacing.3'),
              marginBottom: theme('spacing.4'),
            },
            ul: {
              marginTop: theme('spacing.3'),
              marginBottom: theme('spacing.4'),
              paddingLeft: theme('spacing.6'),
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            maxWidth: '85ch',
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.400'),
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.4'),
            },
            p: {
              color: theme('colors.gray.300'),
              marginTop: theme('spacing.3'),
              marginBottom: theme('spacing.4'),
            },
            ul: {
              marginTop: theme('spacing.3'),
              marginBottom: theme('spacing.4'),
              paddingLeft: theme('spacing.6'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
