/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cat: {
          50: '#fef7f0',
          100: '#fdecd8',
          200: '#fbd5b0',
          300: '#f8b87d',
          400: '#f5934a',
          500: '#f27522',
          600: '#e35d18',
          700: '#bc4616',
          800: '#953a1a',
          900: '#783219',
        }
      },
      fontFamily: {
        'cat': ['Comic Sans MS', 'cursive'],
      }
    },
  },
  plugins: [],
} 