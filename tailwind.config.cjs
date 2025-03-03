/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      // Use classic corporate fonts similar to BlackRock’s identity.
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: "#000000",   // Black remains unchanged
        secondary: "#FFFFFF", // White remains unchanged
        // Darker gold accent for a more refined, subdued look
        gold: {
          DEFAULT: "#B8860B",
        },
        // Adjusted gray scale for darker tones
        gray: {
          50: "#e8e8e8",
          100: "#d1d1d1",
          200: "#bababa",
          300: "#a4a4a4",
          400: "#8e8e8e",
          500: "#787878",
          600: "#616161",
          700: "#4b4b4b",
          800: "#353535",
          900: "#1e1e1e",
        },
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(184, 134, 11, 0.3)', // using a darker gold shadow
        'inner-3d': 'inset 0 3px 6px rgba(184, 134, 11, 0.1)',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
