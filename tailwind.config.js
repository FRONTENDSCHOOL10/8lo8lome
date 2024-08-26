/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/*/.{js,jsx}'],
  theme: {
    extend: {
      // colors: {
      //   // 참고: https://tailwindcss.com/docs/customizing-colors#using-css-variables
      //   accent: 'rgb(var(--accent-color) / <alpha-value>)',
      //   planned: colors.slate[400],
      //   ongoing: colors.teal[400],
      //   done: colors.blue[400],
      // },
    },
  },

  // 참고: https://tailwindcss.com/docs/plugins
  // plugins: [
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
  // ],
};
