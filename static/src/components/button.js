export default function Button(props) {
  return (
      h('button', 
        {
          class: 'bg-blue-600 text-white px-4 py-2',
          '@click': props.onClick,
          'x-text': props.text
        },
        'OK'
      )
  )
}
