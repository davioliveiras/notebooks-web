/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'bounce-top': 'bounce-top 7s infinite',
        'bounce-bottom': 'bounce-bottom 7s infinite',
        'fade-in-right': 'fade-in-right 2s',
        'fade-in-left': 'fade-in-left 2s',
        'fade-in-bottom': 'fade-in-bottom 2s',
      },
      keyframes: {
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
          },
        },
        'fade-in-right': {
          '0%': {
            transform: 'translatex(20%)',
            opacity: '0%',
          },
        },
        'fade-in-left': {
          '0%': {
            transform: 'translatex(-20%)',
            opacity: '0%',
          },
        },
        'fade-in-bottom': {
          '0%': {
            transform: 'translatey(80%)',
            opacity: '0%',
          },
        },
      },
      fontFamily: {
        roboto: 'Roboto',
      },
    },
  },
  plugins: [],
};
