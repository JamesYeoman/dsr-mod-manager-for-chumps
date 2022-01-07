import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { ConfigEnv, defineConfig } from 'vite';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const devMode = configEnv.mode === 'development';
  maybeCloseStdin(configEnv);
  return {
    root: resolve(__dirname, 'frontend'),
    css: {
      postcss: {
        map: devMode ? { inline: false } : false,
        plugins: [tailwind(), autoprefixer()],
      },
    },
    plugins: [react()],
    build: {
      outDir: resolve(__dirname, 'dist'), // Move dist out of frontend folder
      emptyOutDir: !devMode,
      sourcemap: devMode,
      minify: devMode,
    },
  };
});

// https://github.com/vitejs/vite/issues/5743
function maybeCloseStdin(configEnv: ConfigEnv) {
  if (configEnv.command === 'build') return;
  process.stdin.on('close', () => {
    process.exit(0);
  });
  process.stdin.resume();
}
