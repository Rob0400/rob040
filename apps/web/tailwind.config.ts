import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        primaryAccent: '#7B7BFF',
        secondary: '#4C1D95',
        glow: '#00E5FF',
        darkBg: '#0B0B1A',
      },
    },
  },
  plugins: [],
};

export default config;