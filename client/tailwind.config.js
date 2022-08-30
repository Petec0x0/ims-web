/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#007999',
        primary: '#568b79',
        body: '#101630'
      }
    },
  },
  plugins: [],
}
