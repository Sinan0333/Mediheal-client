/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        adminGold: '#D3C480',
        adminBlue:'#164B55',
        adminGreen:"#5c7b70",
        userBlue:"#F5F8FF"
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}