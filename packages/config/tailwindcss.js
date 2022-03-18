const plugin = require('tailwindcss/plugin');
const colours = require('./colours.json');
const daisyOverride = colours.darkDaisy;

module.exports = {
  mode: 'jit',
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          neutral: daisyOverride.base.neutralBG,
          primary: daisyOverride.base.primary,
          secondary: daisyOverride.base.secondary,
          accent: daisyOverride.base.accent,
          'neutral-focus': daisyOverride.base.neutralFocus,
          'base-100': daisyOverride.base.light,
          'base-200': daisyOverride.base.medium,
          'base-300': daisyOverride.base.dark,
          'base-content': daisyOverride.content.base,
          'neutral-content': daisyOverride.content.neutral,
          'primary-content': daisyOverride.content.primary,
          'secondary-content': daisyOverride.content.secondary,
          'accent-content': daisyOverride.content.accent,
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
    plugin(function ({ addBase }) {
      addBase({
        body: {
          'background-color': daisyOverride.base.dark,
        },
      });
    }),
    plugin(function ({ addUtilities, theme }) {
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
        '.no-z': {
          'z-index': 'unset',
        },
        '.all-z': {
          'z-index': 999,
        },
      });
    }),
  ],
};
