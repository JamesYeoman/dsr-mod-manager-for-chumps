const base = require('@dsrbmm/frontend/tailwind.config');
const glob = __dirname + '/stories/**/*.{js,jsx,ts,tsx,css}';

module.exports = { ...base, content: [...base.content, glob] };
