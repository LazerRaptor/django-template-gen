import { transform } from '@babel/core';

export default function() {
  return {
    name: 'generate-template',
    async transform(code, filepath) {
      if (filepath.includes('homepage')) {
        const result = transform(code, { presets: ['@babel/preset-env'], plugins: ['@babel/plugin-transform-modules-umd'] });
        const f = new Function(result.code)
        console.log(result.code)
        f()
      }
    }
  } 
}
