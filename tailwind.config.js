/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
const { custom_colors } = require('./tailwind.color-config');

module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    colors: {
      ...custom_colors,
      neutral: colors.slate,
    },
    extend: {},
  },
  plugins: [],
}

