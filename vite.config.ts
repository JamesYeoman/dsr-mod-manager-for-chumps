import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig((command) => {
  maybeCloseStdin(command);
  return {
    root: path.join(process.cwd() + '/frontend'),
    css: {
      postcss: {
        map: command.mode === 'development' ? { inline: false } : false,
        plugins: [
          require('tailwindcss/nesting')(require('postcss-nesting')),
          require('tailwindcss')(),
          require('autoprefixer')(),
        ],
      },
    },
    plugins: [react()],
  };
});

// https://github.com/vitejs/vite/issues/5743
function maybeCloseStdin(command) {
  if (command == 'build') return;
  process.stdin.on('close', () => {
    process.exit(0);
  });
  process.stdin.resume();
}
