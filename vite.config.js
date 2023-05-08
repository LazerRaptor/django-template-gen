import { defineConfig } from 'vite';
import { resolve } from 'path';
import { generateTemplate } from './static/lib';

export default defineConfig({
  plugins: [generateTemplate()],
  root: resolve('./static'),
  base: '/static/',
  server: {
    host: 'localhost',
    port: 3000,
    open: false,
    watch: {
      usePolling: true,
      disableGlobbing: false,
    },
  },
  resolve: {
    extensions: ['.js', '.json', 'mjs', 'css'],
  },
  build: {
    outDir: resolve('./static/dist'),
    assetsDir: '',
    manifest: true,
    emptyOutDir: true,
    target: 'es2015',
    rollupOptions: {
      input: {
        main: resolve('./static/src/index.js'),
      },
      output: {
        chunkFileNames: undefined,
      },
    },
  },
  test: {
    name: 'test',
    root: './static/tests',
  },
});
