/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}",],
  theme: {
    extend: {
      maxHeight: {
        '26': '29rem', // Custom max-height
        'half-screen': '50vh', //half the screen height
      },
    },
  },
  plugins: [],
}

