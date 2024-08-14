import { createPreset } from 'fumadocs-ui/tailwind-plugin';
import type { Config } from 'tailwindcss';

/**
 *  'background' | 'foreground' | 'muted' | 'muted-foreground' | 'popover' | 'popover-foreground' | 'card' | 'card-foreground' | 'border' | 'primary' | 'primary-foreground' | 'secondary' | 'secondary-foreground' | 'accent' | 'accent-foreground' | 'ring';
 */

const colors = {
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  muted: 'var(--muted)',
  'muted-foreground': 'var(--muted-foreground)',
  popover: 'var(--popover)',
  'popover-foreground': 'var(--popover-foreground)',
  card: 'var(--card)',
  'card-foreground': 'var(--card-foreground)',
  border: 'var(--border)',
  primary: 'var(--primary)',
  'primary-foreground': 'var(--primary-foreground)',
  secondary: 'var(--secondary)',
  'secondary-foreground': 'var(--secondary-foreground)',
  accent: 'var(--accent)',
  'accent-foreground': 'var(--accent-foreground)',
  ring: 'var(--ring)',
};

const config = {
  darkMode: ['class'],
  presets: [
    createPreset({
      addGlobalColors: false,
      preset: {
        light: colors,
        dark: colors,
      },
    }),
  ],
  content: [
    './node_modules/fumadocs-ui/dist/**/*.js',
    './pages/**/*.{ts,tsx,md,mdx}',
    './components/**/*.{ts,tsx,md,mdx}',
    './app/**/*.{ts,tsx,md,mdx}',
    './src/**/*.{ts,tsx,md,mdx}',
    './content/**/*.mdx',
    './mdx-components.tsx',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
      },
      colors: {
        border: 'var(hsl(--border))',
        input: 'var(hsl(--input))',
        ring: 'var(hsl(--ring))',
        background: 'var(hsl(--background))',
        foreground: 'var(hsl(--foreground))',
        primary: {
          DEFAULT: 'var(hsl(--primary))',
          foreground: 'var(hsl(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'var(hsl(--secondary))',
          foreground: 'var(hsl(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'var(hsl(--destructive))',
          foreground: 'var(hsl(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'var(hsl(--muted))',
          foreground: 'var(hsl(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'var(hsl(--accent))',
          foreground: 'var(hsl(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'var(hsl(--popover))',
          foreground: 'var(hsl(--popover-foreground))',
        },
        card: {
          DEFAULT: 'var(hsl(--card))',
          foreground: 'var(hsl(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
