import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import generateTemplate from './lib/generateTemplate.js';

export default defineConfig({
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'MyBundle',
    globals: {'alpinejs': 'Alpine'}
  },
  plugins: [generateTemplate(), resolve({ moduleDirectories: ['node_modules']})],
  external: ['alpinejs'],
})