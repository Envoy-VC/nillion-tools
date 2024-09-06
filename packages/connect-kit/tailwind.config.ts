import type { Config } from 'tailwindcss';

const config = {
  darkMode: [
    'variant',
    [
      '@media (prefers-color-scheme: dark) { &:not(.light *) }',
      '&:is(.dark *)',
    ],
  ],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: 'ck-',
  corePlugins: {
    preflight: false,
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: 'var(--ck-background)',
        foreground: 'var(--ck-foreground)',
        overlay: 'var(--ck-overlay)',
        primary: {
          DEFAULT: 'var(--ck-primary)',
          foreground: 'var(--ck-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--ck-secondary)',
          hover: 'var(--ck-secondary-hover)',
          foreground: 'var(--ck-secondary-foreground)',
        },
        link: {
          hover: 'var(--ck-link-hover)',
          foreground: 'var(--ck-link-foreground)',
        },
        muted: {
          foreground: 'var(--ck-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--ck-accent)',
        },
      },
      borderRadius: {
        lg: 'var(--ck-radius)',
        md: 'calc(var(--ck-radius) - 2px)',
        sm: 'calc(var(--ck-radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
