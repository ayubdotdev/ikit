import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      animation: {
        aurora: "aurora 30s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%": { backgroundPosition: "50% 50%" },
          "100%": { backgroundPosition: "300% 50%" },
        },
      },
      colors: {
        "site-bg": "#0a0a0a",
      },
    },
  },

  plugins: [daisyui, addVariablesForColors],

  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "base-100": "#121212", // FIXED: Prevent forced black
        },
      },
      "light",
    ],
    darkTheme: "dark",
  },
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({ ":root": newVars });
}
