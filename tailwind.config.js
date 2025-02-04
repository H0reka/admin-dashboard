/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    
    extend: {
      colors:{
        'brand': '#c63',
        'body-bg': '#27272a',
      }
    },
  },
  plugins: [],
}

