import Alpine from 'alpinejs';

export default () => ({
  map: {},
  add(name, fn) {
    Alpine.data(name, fn)
    try {
      this.map[name] = fn().render()
    } catch(e) {
      console.log('Did you forget to add a render method to your component?, Original error:', e)
    }
  },
  start() {
    Alpine.start();
  }

})
