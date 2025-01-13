/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fira': ['Fira Sans', 'serif'],
        'poppins': ['Poppins', 'serif'],
        'roboto': ['Roboto', 'serif']
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}