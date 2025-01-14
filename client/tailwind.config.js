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
      backgroundColor: {
        'lightbeige': '#F8F4E3',
        'brown': '#B18966',
        'deepbrown': '#4A2C2A',
        'orange': '#FF6F3C',
        'deeporange': '#D95427',
        'softyellow': '#FFC857'
      },
      borderColor: {
        'deepbrown': '#4A2C2A',
      },
      accentColor: {
        'softyellow': '#FFC857'
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}