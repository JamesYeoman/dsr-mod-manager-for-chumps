const base = require('@dsrbmm/config/tailwindcss');

module.exports = {
  ...base,
  content: [`${__dirname}/src/**/*.{js,jsx,ts,tsx,css}`],
};
