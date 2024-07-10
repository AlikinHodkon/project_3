/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Mont: ["Montserrat", "sans-serif"]
      },
      colors: {
        night: "#003366",
      },
      backgroundImage: {
        'clearSky': 'url("./clearSky.jpg")',
        'clouds': 'url("./1479.gif)',
        'cloudsAbove': 'url("./srY.gif")'
      }
    },
  },
  plugins: [],
}