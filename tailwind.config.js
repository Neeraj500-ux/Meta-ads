/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fcf8f3",
        plum: {
          50: "#f8f1fb",
          100: "#f2e9f8",
          200: "#e4d3ed",
          300: "#c9a9db",
          500: "#7a4a9c",
          600: "#623583",
          700: "#4b266a",
          800: "#321b47",
          900: "#22122f",
        },
        coral: {
          50: "#fff0e6",
          100: "#ffe3cc",
          300: "#fbb08f",
          500: "#f77d54",
          700: "#a84321",
        },
        sun: {
          50: "#fff7db",
          200: "#ffe68d",
          400: "#ffd65a",
          700: "#765411",
        },
        ink: "#271b35",
        mute: "#6f6477",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', "Georgia", "serif"],
        sans: ['"DM Sans Variable"', "system-ui", "Segoe UI", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 45px -18px rgba(75,38,106,0.22)",
        lift: "0 28px 60px -20px rgba(75,38,106,0.32)",
        chunk: "0 6px 0 rgba(50,27,71,0.9)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        sheen: {
          "0%,60%": { transform: "translateX(-120%) skewX(-20deg)" },
          "100%": { transform: "translateX(320%) skewX(-20deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(22px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(.9)", opacity: ".7" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        sheen: "sheen 5.5s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        rise: "rise .8s cubic-bezier(.2,.7,.2,1) both",
        pulseRing: "pulseRing 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};
