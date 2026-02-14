/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Anthropic/Claude inspired palette
        claude: {
          50: '#FFF8F3',
          100: '#FFEEDD',
          200: '#FFD9B8',
          300: '#FFC08A',
          400: '#E89B6B',
          500: '#D97757',  // Claude signature terra cotta
          600: '#C4623F',
          700: '#A44E31',
          800: '#7D3A24',
          900: '#5C2A1A',
        },
        // Warm gray scale matching Anthropic aesthetic
        // Overrides Tailwind's cool blue-tinted grays
        gray: {
          50: '#FAFAF8',
          100: '#F3F2EE',
          200: '#E5E3DE',
          300: '#D0CEC7',
          400: '#9A9890',
          500: '#706E66',
          600: '#56544D',
          700: '#3D3B35',
          800: '#2A2924',
          900: '#1A1915',
          950: '#0E0E0B',
        },
        sand: {
          50: '#FAFAF8',
          100: '#F5F4F0',
          200: '#ECEAE3',
          300: '#DDD9CE',
          400: '#C4BFB2',
          500: '#A9A395',
          600: '#8A8475',
          700: '#6B665A',
          800: '#4D4A41',
          900: '#302E28',
        },
        anthro: {
          bg: '#FAF9F6',       // Warm cream background
          surface: '#FFFFFF',
          dark: '#1A1915',     // Warm dark
          darkSurface: '#25241F',
          darkMid: '#2F2E28',
        },
        // Anthropic official accent: Sage green (for Dev)
        'anthro-green': {
          200: '#cdd7c2',
          300: '#adbf9a',
          500: '#788c5d',
          600: '#5f7148',
          700: '#4a5838',
          800: '#3c472e',
        },
        // Anthropic official accent: Muted blue (for News)
        'anthro-blue': {
          200: '#c5dced',
          300: '#9dc3df',
          500: '#6a9bcc',
          600: '#5480ad',
          700: '#46698e',
          800: '#3c5775',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 28px -5px rgba(0,0,0,0.12), 0 6px 12px -5px rgba(0,0,0,0.06)',
        'card-dark': '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'card-dark-hover': '0 12px 28px -5px rgba(0,0,0,0.5), 0 6px 12px -5px rgba(0,0,0,0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
