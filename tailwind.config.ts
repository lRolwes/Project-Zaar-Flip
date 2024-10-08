import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#3490dc', // Custom color with hex value
        'gray': '#303030',
        'dark': '#141416',
        'dark-gray': ' #1e1e1e', 
        'yellow': '#e3bf00',
        'gray-yellow': '#242420',
        'gray-medium': '#404040',
        'text-gray': '#929292',
        'text-light-grey' : '#c1c1c1',
        'whitish':'#ededed',
        'disabled-gray': '#5a5a5a',
        'hoveryellow':'#e4d26f',
        'red': '#ff0000',
        'light-green':'#d7e0cc',
        'blue': '#7baeff',
        'light-gray': '#c1c1c1',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
