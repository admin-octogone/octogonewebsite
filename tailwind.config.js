/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf9f0',
          100: '#f9efd8',
          200: '#f2deb0',
          300: '#eac987',
          400: '#e2b45f',
          500: '#dcb26b', // Couleur principale gold
          600: '#c99e5f',
          700: '#a67b47',
          800: '#86623a',
          900: '#6b4e2e',
          950: '#3b2a19',
        },
        marine: {
          50: '#e5f1ff',
          100: '#cce3ff',
          200: '#99c7ff',
          300: '#66abff',
          400: '#338fff',
          500: '#0073ff',
          600: '#005ccb',
          700: '#004498',
          800: '#002d64',
          900: '#002236', // Couleur principale marine
          950: '#001018',
        },
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite'
      },
    },
  },
  plugins: [],
}
