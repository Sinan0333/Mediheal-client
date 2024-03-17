/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        adminGold: '#D3C480',
        adminBlue:'#164B55',
      },
    },
  },
  plugins: [],
}