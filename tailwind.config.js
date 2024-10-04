/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'universe': 'linear-gradient(120deg, #080E1F 0%, #070E20 100%)',
        'banner': 'url(./public/assets/background.png) no-repeat center center',
      },
      fontFamily :{
        drone: ["drone","sans"],
      }
    },
  },
  plugins: [],
}