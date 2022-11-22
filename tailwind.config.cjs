const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          0: colors.blue[500],
          1: colors.blue[600],
          2: colors.blue[700],
        },
        secondary: {
          0: colors.gray[700],
          1: colors.gray[800],
          2: colors.gray[900],
        },
        success: {
          0: colors.green[500],
          1: colors.green[600],
          2: colors.green[700],
        },
        danger: {
          0: colors.red[500],
          1: colors.red[600],
          2: colors.red[700],
        },
        warning: {
          0: colors.orange[500],
          1: colors.orange[600],
          2: colors.orange[700],
        },
        info: {
          0: colors.cyan[500],
          1: colors.cyan[600],
          2: colors.cyan[700],
        },
      },
      fontFamily: {
        sans: ['Maven Pro', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
