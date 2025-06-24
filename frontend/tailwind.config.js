/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // crucial for dark/light toggle
  theme: {
    extend: {},
  },
  plugins: [],
}
