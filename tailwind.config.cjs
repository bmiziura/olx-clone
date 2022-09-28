/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#002f34",
        "primary-lg": "#7f9794",

        lightAqua: "#cbf7ee",

        categories: {
          motoryzacja: "#ffce32",
          nieruchomosci: "#3a77ff",
        },
      },
    },
  },
  plugins: [],
}
