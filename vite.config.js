import { defineConfig } from 'vite';
import { resolve } from 'path';
import createTemplate from './static/lib/createTemplate.mjs'

export default defineConfig({
  plugins: [createTemplate({ templateDir: './django-vite/templates' })],
  root: resolve('./static/src'),
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
    extensions: ['.js', 'ts', '.json', 'mjs', 'css'],
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
