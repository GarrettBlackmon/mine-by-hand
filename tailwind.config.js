/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hash-green': '#22c55e',
        'hash-red': '#ef4444',
      }
    },
  },
  plugins: [],
} 