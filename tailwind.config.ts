import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './client/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(3, 7, 18)',
        foreground: 'rgb(249, 250, 251)',
        card: 'rgb(11, 17, 32)',
        'card-foreground': 'rgb(249, 250, 251)',
        popover: 'rgb(11, 17, 32)',
        'popover-foreground': 'rgb(249, 250, 251)',
        primary: 'rgb(59, 130, 246)',
        'primary-foreground': 'rgb(255, 255, 255)',
        secondary: 'rgb(31, 41, 55)',
        'secondary-foreground': 'rgb(249, 250, 251)',
        muted: 'rgb(31, 41, 55)',
        'muted-foreground': 'rgb(156, 163, 175)',
        accent: 'rgb(34, 197, 94)',
        'accent-foreground': 'rgb(255, 255, 255)',
        destructive: 'rgb(239, 68, 68)',
        'destructive-foreground': 'rgb(255, 255, 255)',
        border: 'rgb(31, 41, 55)',
        input: 'rgb(31, 41, 55)',
        ring: 'rgb(59, 130, 246)',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
};

export default config;
