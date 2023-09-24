/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    darkMode: false,
    extend: {
      colors: {
        darkPrimary: "#121214",
        darkSecondary: "#424242",
        whitePrimary: "#FFF",
        whiteSecondary: "#FAFAFA",
        colorPrimary: "#FFD836",
        colorSecondary: "#998220"
      },
      screens: {
        'mobile': { 'max': '425px' },
        'tablet': { 'max': '768px' },
        'notebook': { 'min': '1024px', 'max': '1440px' },
      },
      backgroundImage: {
        "hero-login":
          "url('/hero-login.jpg')",
        "pattern-home":
          "url('/bbq-pattern.png')",
      },
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
}