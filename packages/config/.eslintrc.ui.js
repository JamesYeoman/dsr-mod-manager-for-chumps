const base = require('./.eslintrc');

module.exports = {
  ...base,
  env: {
    ...base.env,
    browser: true,
  },
  extends: ['plugin:react/recommended', ...base.extends],
  parserOptions: {
    ...base.parserOptions,
    ecmaFeatures: { jsx: true },
  },
  plugins: [...base.plugins, 'react-hooks'],
  rules: {
    ...base.rules,
    'react/display-name': 'off',
    'react/jsx-boolean-value': 'error',
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
    'react/jsx-key': 'error',
    'react/jsx-wrap-multilines': 'error',
  },
  settings: {
    ...base.settings,
    react: {
      version: 'detect',
    },
  },
};
