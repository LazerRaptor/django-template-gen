import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import generateTemplate from './lib/generateTemplate.js';

export default defineConfig({
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  plugins: [generateTemplate(), nodeResolve()],
  external: ['alpinejs', /node_modules/],
})
