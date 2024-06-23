/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-pink': '#D4145A',
        'custom-orange': '#FBB03B',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'Gwendolyn': ['Gwendolyn', 'cursive'],
      },
    },
  },
  plugins: [],
}