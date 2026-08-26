/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        // Section Themes: Cream, Soft Sage Green, Rose Blush, Rich Espresso
        cream: {
          50: "#FDFAF7",
          100: "#FAF6F0",
          200: "#F4EDE2",
          300: "#EBE0D2",
          400: "#DC runC9B5",
          500: "#C4AF98",
        },
        sage: {
          50: "#F6F8F4",
          100: "#EEF3EB",
          200: "#DFE8DA",
          300: "#C8D7C0",
          400: "#A2BBA1",
          500: "#739373",
          900: "#243424",
        },
        rose: {
          50: "#FDF7F8",
          100: "#FAF0F2",
          200: "#F6E0E5",
          300: "#ECC2CB",
          400: "#DC99A8",
          500: "#C46E82",
          900: "#451924",
        },
        espresso: {
          50: "#F7F5F4",
          100: "#ECE8E5",
          200: "#D6CCC6",
          300: "#B8A79E",
          700: "#54463F",
          800: "#382D28",
          900: "#211916",
          950: "#140E0C",
        },
      },
      fontFamily: {
        serif: ["Italiana", "Playfair Display", "serif"],
        display: ["Italiana", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
