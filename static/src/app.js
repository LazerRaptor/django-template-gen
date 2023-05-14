import Alpine from 'alpinejs';
import h from '../lib/vhtml';

globalThis.h = h;

export default () => ({
  add(name, fn) {
    Alpine.data(name, fn)
  },
  start() {
    Alpine.start();
    window.Alpine = Alpine;
  }
})
