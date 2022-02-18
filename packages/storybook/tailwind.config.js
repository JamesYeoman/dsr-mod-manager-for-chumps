const base = require('@dsrbmm/config/tailwindcss');

module.exports = {
  ...base,
  content: [
    '../frontend/src/**/*.{js,jsx,ts,tsx,css}',
    './stories/**/*.{js,jsx,ts,tsx,css}',
  ],
};
