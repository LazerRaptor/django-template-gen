import Button from '../components/button';

export default (context) => ({
  init() {
    this.users = context.users
  },
  onClick() {
    console.log("clicked");
  },
  render() {
    return (
      h('div', null, [
        h('h1', {}, 'Hey Mr. Panda bear,'),
        h('p', {}, 'We dont take kindly to your types around here!'),
        Button()
      ])
    )
  }
})
