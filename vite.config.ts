import { defineConfig } from 'vite';
import { genBuildOpts, maybeCloseStdin, plugins, root } from './vite/vite.common';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  maybeCloseStdin(configEnv);
  return { root, plugins, build: genBuildOpts(configEnv, 'dist') };
});
