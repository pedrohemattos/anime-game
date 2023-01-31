/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'indie': ['Indie Flower', 'cursive'],
        'kaushan': ['Kaushan Script', 'cursive'],
        'poppins': ['Poppins', 'sans-serif']
      },
      spacing: {
        '400': '30rem'
      },
      animation: {
        'spinVersus': 'spin 0.8s ease-out'
      }
    },
  },
  plugins: [],
}
