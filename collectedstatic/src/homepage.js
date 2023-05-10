import h from '../lib/vhtml';

export default (context) => ({
  init() {
    this.users = context.users
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
})
