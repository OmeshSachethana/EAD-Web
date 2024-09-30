/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2", // Custom primary color (Twitter blue)
        secondary: "#14171A", // Custom secondary color
        accent: "#FFAD1F", // Custom accent color
      },
      spacing: {
        128: "32rem", // Custom spacing
        144: "36rem",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // Custom font family
        serif: ["Merriweather", "ui-serif"],
      },
      borderRadius: {
        "4xl": "2rem", // Custom border radius
      },
    },
  },
  plugins: [],
};
