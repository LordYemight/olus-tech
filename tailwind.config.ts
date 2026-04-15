import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { 
    extend: {
      colors: { 
        primary: "#0a192f", 
        secondary: "#ffffff", 
        accent: "#00f3ff" 
      },
      fontFamily: { 
        heading: ["var(--font-heading)"], 
        sans: ["var(--font-body)"] 
      }
    }
  },
  plugins: []
};
export default config;