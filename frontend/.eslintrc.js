const base = require('@dsrbmm/config/eslint.ui');
module.exports = {
  ...base,
  parserOptions: {
    ...base.parserOptions,
    project: './tsconfig.json',
  },
};
