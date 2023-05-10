import { test, expect } from 'vitest';
import h from '../lib/vhtml';

globalThis.h = h;

test('transform hyperscript', () => {
  expect(h('div', {}, 'hello world')).toBe('<div>hello world</div>');
})

test('evaluate source code', () => {
  const s = `
    const ret = h('div', null, [
      h('h1', null, 'This is a headline'),
      h('p', { class: 'fancy-text' }, 'This is a paragraph')
    ]);
    return ret;
  `
  const f = new Function('h', s)
  expect(f(h)).toBe('<div><h1>This is a headline</h1><p class="fancy-text">This is a paragraph</p></div>')
})
