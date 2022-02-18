const base = require('@dsrbmm/config/.eslintrc.ui');
module.exports = {
  ...base,
  parserOptions: {
    ...base.parserOptions,
    project: `${__dirname}/tsconfig.json`,
  },
};
