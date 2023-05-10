import Alpine from '../node_modules/alpinejs/builds/module';

const emptyTags = [
	'area',
	'base',
	'br',
	'col',
	'command',
	'embed',
	'hr',
	'img',
	'input',
	'keygen',
	'link',
	'meta',
	'param',
	'source',
	'track',
	'wbr'
];

// escape an attribute
let esc = str => String(str).replace(/[&<>"']/g, s=>`&${map[s]};`);
let map = {'&':'amp','<':'lt','>':'gt','"':'quot',"'":'apos'};
let setInnerHTMLAttr = 'dangerouslySetInnerHTML';
let DOMAttributeNames = {
	className: 'class',
	htmlFor: 'for'
};

let sanitized = {};

/** Hyperscript reviver that constructs a sanitized HTML string. */
function h(name, attrs) {
	let stack=[], s = '';
	attrs = attrs || {};
	for (let i=arguments.length; i-- > 2; ) {
		stack.push(arguments[i]);
	}

	// Sortof component support!
	if (typeof name==='function') {
		attrs.children = stack.reverse();
		return name(attrs);
		// return name(attrs, stack.reverse());
	}

	if (name) {
		s += '<' + name;
		if (attrs) for (let i in attrs) {
			if (attrs[i]!==false && attrs[i]!=null && i !== setInnerHTMLAttr) {
				s += ` ${DOMAttributeNames[i] ? DOMAttributeNames[i] : esc(i)}="${esc(attrs[i])}"`;
			}
		}
		s += '>';
	}

	if (emptyTags.indexOf(name) === -1) {
		if (attrs[setInnerHTMLAttr]) {
			s += attrs[setInnerHTMLAttr].__html;
		}
		else while (stack.length) {
			let child = stack.pop();
			if (child) {
				if (child.pop) {
					for (let i=child.length; i--; ) stack.push(child[i]);
				}
				else {
					s += sanitized[child]===true ? child : esc(child);
				}
			}
		}

		s += name ? `</${name}>` : '';
	}

	sanitized[s] = true;
	return s;
}

var Homepage = (context) => ({
  init() {
    this.users = context.users;
  },
  onClick() {
    console.log("clicked");
  },
  render() {
    return (
      h('div', {'x-data': 'homepage({{ context }})', 'class': 'prose w-2/3 mx-auto'}, [
        h('h1', {}, 'Welcome to my website!'),
        h('p', null, 'See the list of all our users:'),
        h('ul', {}, [
          h('template', {'x-for': 'user in users'}, [
            h('li', {'x-text': 'user.email'})
          ]),
        ]),

        h('h1', {}, 'Man...'),
        h('button', {'@click': 'onClick', 'class': 'px-4 py-2 bg-blue-600 text-white'}, 'Click me!'),
      ])
    )
  }
});

class App {
  map = {}

  add(name, component) {
    Alpine.data(name, component);
    this.map[name] = component.render();
  }
  start() {
    console.info(`Map: ${this.map}`);
    Alpine.start();
  }
}

App.add(Homepage);
App.run();

export { App as default };
