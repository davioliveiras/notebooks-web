/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "bounce-top": "bounce-top 7s infinite",
        "bounce-bottom": "bounce-bottom 7s infinite"
      },
      keyframes:{
        'bounce-bottom': {
          '0%, 100%': {
            transform: 'translateY(7%)',
          },
          '50%': {
            transform: 'translateY(-7%)',
          },
        },
        'bounce-top': {
          '0%, 100%': {
            transform: 'translateY(-7%)',
          },
          '50%': {
            transform: 'translateY(7%)',
          }
        }
      }
    },
  },
  plugins: [],
}

