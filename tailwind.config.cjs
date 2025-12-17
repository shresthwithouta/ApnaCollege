/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* your existing palette (kept untouched) */
      colors: {
        brand: {
          white: "#ffffff",
          light: "#676f9d",
          mid: "#424769",
          dark: "#2d3250",
          accent: "#f9b17a",
        },
        // tailwind.config.js  (inside theme.extend)
keyframes: {
  floatSlow: {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-12px)" },
  },
  floatSlower: {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-8px)" },
  },
},
keyframes: {
  floatA: {
    "0%": { transform: "translate(0px, 0px)" },
    "50%": { transform: "translate(20px, -24px)" },
    "100%": { transform: "translate(0px, 0px)" },
  },
  floatB: {
    "0%": { transform: "translate(0px, 0px)" },
    "50%": { transform: "translate(-24px, 18px)" },
    "100%": { transform: "translate(0px, 0px)" },
  },
},
animation: {
  floatA: "floatA 18s ease-in-out infinite",
  floatB: "floatB 26s ease-in-out infinite",
},

animation: {
  floatSlow: "floatSlow 12s ease-in-out infinite",
  floatSlower: "floatSlower 18s ease-in-out infinite",
},

        surface: "rgba(255,255,255,0.04)",
      },

      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
        },
      },

      borderRadius: {
        xl: "1rem",
      },

      /* ✅ ANIMATIONS (THIS WAS MISSING) */
      keyframes: {
        loginMarquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        registerMarquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-70%)" },
        },
      },

      animation: {
        loginMarquee: "loginMarquee 40s linear infinite",
        registerMarquee: "registerMarquee 25s linear infinite",
      },
    },
  },
  plugins: [],
};
