import { test, expect } from 'vitest';
import h from '../lib/vhtml';
import { evenBrackets } from '../lib/generateTemplate';

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
  const f = new Function(s)
  expect(f()).toBe('<div><h1>This is a headline</h1><p class="fancy-text">This is a paragraph</p></div>')

  const s2 = `
    const button = (props) => h('button', { ...props }, 'clickme');
    const ret = h('div', null, [
      h('h1', null, 'This is a headline'),
      h('p', { class: 'fancy-text' }, 'This is a paragraph'),
      button({'class': 'fancy-button'})
    ]);
    return ret;
  `
  const f2 = new Function(s2)
  expect(f2()).toBe(
    '<div><h1>This is a headline</h1><p class="fancy-text">This is a paragraph</p><button class="fancy-button">clickme</button></div>'
  )
})

test('even brackets', () => {
  expect(evenBrackets('abc')).toBe('abc')
  expect(evenBrackets('({foobar})')).toBe('({foobar})')
  expect(evenBrackets('(({{()}}')).toBe('(({{()}}))')
  expect(evenBrackets('(({{()}}))})}')).toBe('(({{()}}))')
  expect(evenBrackets('(){{}})}')).toBe('(){{}}')
})
