/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        home: "250px 1fr",
        timeline: "600px 300px",
        "": "",
      },
    },
  },
  plugins: [],
};
