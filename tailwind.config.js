/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#16efa4',
        black: '#1e1e1e',
        white: '#ffffff',
        subBg: '#2A2A2A',
        warning: '#fd0000',
      },
    },
  },

  // 참고: https://tailwindcss.com/docs/plugins
  plugins: [
    //   ({ addComponents, addUtilities }) => {
    //     addComponents({
    //       '.euid-button': {
    //         '@apply border-2 border-solid border-indigo-600 py-2 px-5 rounded-lg text-indigo-600 font-medium uppercase':
    //           {},
    //       },
    //     });
    //     addUtilities({
    //       '.a11y-hidden': {},
    //     });
    //   },
  ],
};
