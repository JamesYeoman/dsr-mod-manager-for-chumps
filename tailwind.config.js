module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'app-blue': '#94C7D2',
        'card-blue': '#80B6B8',
        'card-light': '#CCDCAA',
        'card-dark': '#A4BA76',
        'card-selected': '#7C9842',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
