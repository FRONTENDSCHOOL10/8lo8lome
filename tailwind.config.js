/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#16efa4',
        black: '#171717',
        white: '#ffffff',
        subBg: '#2A2A2A',
        warning: '#fd0000',
        borderPrimary: '#16efa4',
      },
    },
  },
  plugins: [],
};
