/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#3B82F6",
        appBg: "#F8FAFC",
        ink: "#0F172A",
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        soft: "0 18px 55px rgba(15, 23, 42, 0.10)",
        softDark: "0 18px 55px rgba(0, 0, 0, 0.30)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "auth-grid":
          "linear-gradient(rgba(37,99,235,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.09) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
