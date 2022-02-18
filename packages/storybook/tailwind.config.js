const base = require('@dsrbmm/config/tailwindcss');
const path = require('path');

module.exports = {
  ...base,
  content: [
    '../../frontend/src/**/*.{js,jsx,ts,tsx,css}',
    './stories/**/*.{js,jsx,ts,tsx,css}',
  ],
};
