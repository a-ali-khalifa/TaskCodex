/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Rubik'],
        data: ['Poppins']
      },
      colors: {
        'primary': '#3F65FF',
        'secondary': '#03AC22',
        'tertiary': '#FF0019',
      }
    },
  },
  plugins: [],
  darkMode: "class",
}

