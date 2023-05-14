export default (context) => ({
  init() {
    this.content = context.content;
    console.log(this.content);
  },
  render() {
    return (
      h('div', { class: 'container mx-auto prose' }, [
        h('h1', {'x-text': 'content'}, '')
      ])
    )
  }
})
