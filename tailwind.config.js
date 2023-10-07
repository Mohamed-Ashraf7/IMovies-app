/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#d32f2f",
        header: "#101010",
        dark: "#191919",
        light: "#fff",
      },
      screens: {
        mobile: {
          max: "768px",
        },
      },
      transitionProperty: {
        margin: "margin",
        opacity: "opacity",
        transform: "transform",
      },
      backgroundColor: {
        dark: "#191919",
        light: "#fff",
      },
      textColor: {
        dark: "#191919",
        light: "#fff",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
