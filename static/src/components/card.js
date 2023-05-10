import h from '../../lib/vhtml';

function Card(children) {
  return ({
    render() {
      return (
        h('div', { class: 'px-4 py-2' }, [children] )
      )
    }
  })
}

export default Card;
