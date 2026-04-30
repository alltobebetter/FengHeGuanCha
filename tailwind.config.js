/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        wenkai: ['"LXGW WenKai Mono"', '"LXGW WenKai"', "ui-serif", "serif"],
        serifsc: ['"Noto Serif SC"', '"Source Han Serif SC"', "ui-serif", "serif"],
      },
      colors: {
        paper: "#F8F5EE",
        ink: "#2A2A2A",
        muted: "#6B6B66",
        accent: "#3F5D4C",
      },
      maxWidth: {
        prose: "680px",
      },
    },
  },
  plugins: [],
};
