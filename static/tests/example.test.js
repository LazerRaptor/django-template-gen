import { expect, test } from 'vitest';
import h from '../lib/vhtml';

const hs = `
  ("div", { "x-data": "homepage", className: "bg-blue" }, 
    h("h1", null, "Hello world!"), 
    h("p", null, "This content is compiled from JSX into a regular Django template. Awesome!")
  )
`
test('transform', () => {
  expect(h('h1', null, "Hello world!")).toBe('<h1>Hello world!</h1>')
  expect(h('div', null, [
    h('span', {}, 'Yo man')
  ])).toBe('<div><span>Yo man</span></div>')
})

