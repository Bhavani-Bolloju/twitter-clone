/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        home: "250px 1fr",
        timeline: "580px 320px",
        "": "",
      },
    },
  },
  plugins: [],
};
