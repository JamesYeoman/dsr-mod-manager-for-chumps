import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { ConfigEnv } from 'vite';

const rootFolder = resolve(__dirname, '..');

export const root = resolve(rootFolder, 'frontend');
export const plugins = [react()];

export const genBuildOpts = (configEnv: ConfigEnv, outDir: string) => {
  const devMode = configEnv.mode === 'development';

  return {
    outDir: resolve(rootFolder, outDir),
    emptyOutDir: !devMode,
    sourcemap: devMode,
    minify: devMode,
  };
};

// https://github.com/vitejs/vite/issues/5743
export const maybeCloseStdin = (configEnv: ConfigEnv) => {
  if (configEnv.command === 'build') return;
  process.stdin.on('close', () => {
    process.exit(0);
  });
  process.stdin.resume();
};
