import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  css: {
    postcss: {
      map: mode === 'development' ? { inline: false } : false,
      plugins: [
        require('tailwindcss/nesting')(require('postcss-nesting')),
        require('tailwindcss')(),
        require('autoprefixer')(),
      ],
    },
  },
  plugins: [reactRefresh()],
}));
