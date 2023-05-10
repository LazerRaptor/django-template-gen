import Alpine from '../node_modules/alpinejs/builds/module';

export default class App {
  map = {}

  add(name, component) {
    Alpine.data(name, component)
    this.map[name] = component.render()
  }
  start() {
    console.info(`Map: ${this.map}`)
    Alpine.start()
  }
}
