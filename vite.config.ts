import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { ConfigEnv, defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const devMode = configEnv.mode === 'development';
  const ghPageDir = resolve(__dirname, 'docs');
  const buildDir = resolve(__dirname, 'dist');
  maybeCloseStdin(configEnv);
  return {
    root: resolve(__dirname, 'frontend'),
    plugins: [react()],
    build: {
      // Move dist out of frontend folder
      outDir: configEnv.mode === 'ghpage' ? ghPageDir : buildDir,
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
