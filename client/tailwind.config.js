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
        '4xl':'15px 0px 15px 15px',
        '5xl': '0px 15px 15px 15px'
      },
      gradientColorStops:theme => ({
        'custom-purple-light': '#4B0082',
        'custom-purple-dark': '#33006F',
      }),
      fontFamily:{
        'edu-nsw': ['"Edu NSW ACT Foundation"', 'cursive'],
      }
      
    },
  },
  plugins: [],
}

