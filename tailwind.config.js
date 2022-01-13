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
      keyframes: {
        'bye-bye': {
          from: {
            opacity: '1',
            transform: 'scale(1)',
          },
          to: {
            opacity: '0',
            transform: 'scale(0)',
            margin: '0',
            height: '0',
          },
        },
      },
      animation: {
        'bye-bye': 'bye-bye 0.5s forwards',
      },
    },
  },
  plugins: [require('daisyui')],
};
