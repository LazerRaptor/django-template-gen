import Alpine from 'alpinejs';

export default () => ({
  add(name, fn) {
    Alpine.data(name, fn)
  },
  start() {
    Alpine.start();
    window.Alpine = Alpine;
  }
})
