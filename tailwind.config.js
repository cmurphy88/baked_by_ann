/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fafa',
          100: '#d9f2f2',
          200: '#b8e8e8',
          300: '#9DD4D3',
          400: '#7bc5c4',
          500: '#5ab6b5',
          600: '#449a99',
          700: '#357b7a',
          800: '#2a6261',
          900: '#245251',
        },
      },
    },
  },
  plugins: [],
}
