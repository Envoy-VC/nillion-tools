import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: 'ck-',
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
        border: 'hsl(var(--ck-border))',
        input: 'hsl(var(--ck-input))',
        ring: 'hsl(var(--ck-ring))',
        background: 'hsl(var(--ck-background))',
        foreground: 'hsl(var(--ck-foreground))',
        primary: {
          DEFAULT: 'hsl(var(--ck-primary))',
          foreground: 'hsl(var(--ck-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--ck-secondary))',
          foreground: 'hsl(var(--ck-secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--ck-destructive))',
          foreground: 'hsl(var(--ck-destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--ck-muted))',
          foreground: 'hsl(var(--ck-muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--ck-accent))',
          foreground: 'hsl(var(--ck-accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--ck-popover))',
          foreground: 'hsl(var(--ck-popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--ck-card))',
          foreground: 'hsl(var(--ck-card-foreground))',
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
