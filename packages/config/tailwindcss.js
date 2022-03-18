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
  plugins: [
    require('daisyui'),
    require('tailwindcss/plugin')(function ({ addBase, addUtilities, theme }) {
      addBase({
        body: {
          'background-color': theme('colors.base-300'),
        },
      });
      addUtilities({
        '.soft-corners': {
          '@apply rounded-xl shadow-lg': {},
        },
        '.flex-vert': {
          display: 'flex',
          'flex-direction': 'column',
        },
        '.card-text': {
          '@apply font-bold text-center': {},
          'font-size': '1.25rem',
        },
        '.debug-border': {
          'border-width': '2px',
          'border-style': 'solid',
          'border-color': theme('colors.red.500'),
        },
      });
    }),
  ],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          'base-100': '#2a2e37',
          'base-200': '#16181d',
          'base-300': '#000000',
          'base-content': '#ebecf0',
          neutral: '#2a2e37',
          'neutral-focus': '#16181d',
          'neutral-content': '#ffffff',
        },
      },
    ],
  },
};
