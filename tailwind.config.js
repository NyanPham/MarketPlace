/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'universe': 'linear-gradient(120deg, #171923 0%, #3B3F4E 100%)',
      },
    },
  },
  plugins: [],
}