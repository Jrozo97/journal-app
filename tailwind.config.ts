import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#1D5C63",
        "secondary": "#2C98A0",
        "gray": "9E9E9E",
        "light-gray": "#C4C4C4",
        "error": "#EA3232",
        "success": "#2C98A0",
        "green": "#2C98A0",
        "green-g": "#417D7A",
      
      }
    },
  },
  plugins: [],
};
export default config;
