/* eslint-disable */

/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");
const svgToDataUri = require("mini-svg-data-uri");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/routes/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      fontSize: {
        "heading-1": ["48px", "58px"],
        "heading-2": ["36px", "44px"],
        "heading-3": ["30px", "36px"],
        "heading-4": ["24px", "32px"],
        "heading-5": ["20px", "24px"],
        "heading-6": ["18px", "22px"],
        body: ["16px", "19px"],
        small: ["14px", "17px"],
        xs: ["12px", "15px"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          "300": "#F4926F",
          "700": "#A9421C",
          "900": "#642711",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        ["supporting-text"]: "#B4B4B4",
        neutral: {
          "50": "#EFEFEF",
          "100": "#CCCCCC",
          "200": "#B4B4B4",
          "300": "#929292",
          "400": "#7D7D7D",
          "500": "#5C5C5C",
          "600": "#545454",
          "700": "#414141",
          "800": "#272727",
          "900": "#272727",
        },
        blue: {
          DEFAULT: "#37AEFF",
          "50": "#EBF7FF",
          "100": "#C1E6FF",
          "200": "#A3DAFF",
          "300": "#6BBFFF",
          "400": "#5FBEFF",
          "500": "#37AEFF",
          "600": "#329EE8",
          "700": "#277CB5",
          "800": "#1E608C",
          "900": "#17496B",
        },
        yellow: {
          DEFAULT: "#FFE24B",
          "50": "#FFFCED",
          "100": "#FFF6C7",
          "200": "#FFF2AC",
          "300": "#FFEC86",
          "400": "#FFE86F",
          "500": "#FFE24B",
          "600": "#E8CE44",
          "700": "#B5A035",
          "800": "#8C7C29",
          "900": "#6B5F20",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
        pulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--pulse-color)" },
          "50%": { boxShadow: "0 0 0 8px var(--pulse-color)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
        "spin-slow": "spin 4s linear infinite",
        pulse: "pulse var(--duration) ease-out infinite",
      },
      backgroundImage: {
        rewards: "url('/rewards.svg')",
        "blue-radial":
          "radial-gradient(162.79% 75.11% at 50% 24.89%, rgba(242, 252, 254, 1) 0%, rgba(215, 247, 255, 1) 45.42%, rgba(198  , 245, 255, 1) 100%)",
        "linear-hero-banner":
          "linear-gradient(258deg, rgba(255, 241, 228, 1) 0.98%, rgba(255, 255, 255, 1) 49.97%, rgba(255, 241, 228, 1) 87.01%)",
        "linear-blue": "linear-gradient(180deg, #FFF 0%, rgba(217, 240, 255, 0.50) 100%)",
        "red-yellow-linear":
          "linear-gradient(90deg, rgba(238, 76, 40, 1) 0%, rgba(255, 175, 25, 1) 100%)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"), // Add the typography plugin
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-dot-thick": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
