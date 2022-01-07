module.exports = {
  mode: 'jit',
  content: [`${__dirname}/frontend/src/**/*.{js,jsx,ts,tsx,css}`],
  theme: {
    extend: {
      colors: {
        'app-background': '#94C7D2',
        'section-background': '#80B6B8',
        'mod-card-default': '#CCDCAA',
        'mod-card-selected': '#7C9842',
      },
    },
  },
  plugins: [require('daisyui')],
};
