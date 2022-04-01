// The below references are required for vitest
/// <reference types="vitest" />
/// <reference types="vitest/globals" />

import { resolve } from 'path';

import type { ConfigEnv } from 'vite';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://github.com/vitejs/vite/issues/5743
function maybeCloseStdin(configEnv: ConfigEnv) {
  if (configEnv.command === 'build') return;
  process.stdin.on('close', () => {
    process.exit(0);
  });
  process.stdin.resume();
}

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const devMode = configEnv.mode === 'development';
  // May not be needed anymore
  maybeCloseStdin(configEnv);
  return {
    base: 'GH_PAGES_BUILD' in process.env ? '/dsrbmm/' : undefined,
    // Let dead code elimination get rid of tests in the production build
    define: {
      'import.meta.vitest': 'undefined',
    },
    test: {
      includeSource: ['src/**/*.ts'],
    },
    plugins: [react()],
    build: {
      // Move dist out of frontend folder
      outDir: resolve(__dirname, 'build', 'dist'),
      minify: !devMode,
      sourcemap: devMode,
    },
  };
});
