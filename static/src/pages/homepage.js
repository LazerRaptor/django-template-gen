import Button from '../components/button';

export default (context) => ({
  text: 'Click me',
  counter: 0,

  init() {
    console.log(context);
  },
  onClick() {
    this.counter += 1;
    console.log(`Button clicked ${this.counter} times`);
  },
  render() {
    return (
      h('div', { class: 'container mx-auto prose' }, [
        h('h1', null, 'Hello there, stranger!'),
        h('p', null, 'Anyway, how is your sex life?'),
        Button({ text: 'text', onClick: 'onClick()'})
      ])
    )
  }
})
