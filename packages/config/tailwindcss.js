module.exports = {
  mode: 'jit',
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
