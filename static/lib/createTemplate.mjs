import fs from 'fs'
import path from 'path'

export default ({
  templateDir,
  baseName = 'base.html',
  contentTag = 'content',
}) => {
  return {
    name: 'create-template',
    async handleHotUpdate({ file }) {
      let module
      try {
        // prevents from using chached module
        module = await import(`${file}?cachebust=${Date.now()}`)
      } catch(e) {
        console.error(e)
      }
      if (module.default && module.default().render) {
        const content = module.default().render()
        const html = `
          {% extends "${baseName}" %}
          {% block ${contentTag} %}
          ${content}
          {% endblock %}
        `.trim()
        const templateName = file.split('/')[file.split('/').length - 1].replace('.mjs', '') + '.html'
        const fullPath = path.join(process.cwd(), templateDir, templateName)
        fs.writeFileSync(fullPath, html)
      }
    }
  }
}
