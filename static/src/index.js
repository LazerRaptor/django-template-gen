import Alpine from "alpinejs";

import Homepage from './homepage.mjs';

window.Alpine = Alpine;

Alpine.register = (compName, component) => {
  return Alpine.data(compName, component);
};

Alpine.register("homepage", Homepage);
Alpine.start();
