import Button from '../components/button';

export default (context) => ({
  text:'foobar',
  init() {
    console.log(context)
  },
  onClick() {
    this.text = 'Clicked!'
  },
  render() {
    return (
      h('div', {class: 'container mx-auto prose'}, [
        h('h1', null, 'Hello there, stranger!'),
        h('p', null, 'Anyway, how is your sex life?'),
        Button({ text: this.text, onClick: "onClick()"})
      ])
    )
  }
})
