import { defineConfig } from 'vite';
import { maybeCloseStdin, plugins, root, genBuildOpts } from './vite.common';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  maybeCloseStdin(configEnv);
  return { root, plugins, build: genBuildOpts(configEnv, 'docs') };
});
