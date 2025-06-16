import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        // --- UPDATED 'stone' OVERRIDE SECTION (reflecting new palette) ---
        // This mapping ensures your existing `stone-X` classes use the new theme colors.
        stone: {
          50:  "hsl(var(--background))",       // Soft dark blue-grey for lightest stone
          100: "hsl(var(--card))",            // Card background shade
          200: "hsl(var(--popover))",         // Popover background shade
          300: "hsl(var(--border))",          // Border color
          400: "hsl(var(--input))",           // Input field background
          500: "hsl(var(--muted))",           // Muted background/text for softer elements
          600: "hsl(var(--secondary))",       // Muted dark blue for secondary elements
          700: "hsl(var(--primary))",         // Deep blue for primary elements
          800: "hsl(var(--foreground))",      // Light desaturated grey-white for main text
          900: "hsl(var(--accent))",          // Brighter deep blue for accents
          950: "hsl(var(--background))",      // Deepest background shade
        },
        // ----------------------------------------
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;