/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        '3xl': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
      },
      borderRadius:{
        '4xl':'9px 0px 9px 9px',
        '5xl': '0px 9px 9px 9px'
      }
      
    },
  },
  plugins: [],
}

