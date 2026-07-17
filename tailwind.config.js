/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        moss: {
          50: "#f4f6f1",
          100: "#e5eadd",
          200: "#cbd6bc",
          300: "#a9bb92",
          400: "#889f6c",
          500: "#6c8350",
          600: "#54673d",
          700: "#414f32",
          800: "#36402b",
          900: "#2e3626",
        },
        clay: {
          50: "#fbf5f1",
          100: "#f3e2d6",
          200: "#e6c1a8",
          300: "#d69c76",
          400: "#c37c50",
          500: "#a8613a",
          600: "#8a4c2e",
          700: "#6f3d27",
          800: "#5c3323",
          900: "#4d2c1f",
        },
        linen: "#f7f3ea",
        ink: "#22201b",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
