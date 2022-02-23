const base = require('@dsrbmm/config/tailwindcss');
const glob = __dirname + '/src/**/*.{js,jsx,ts,tsx,css}';

module.exports = { ...base, content: [glob] };
