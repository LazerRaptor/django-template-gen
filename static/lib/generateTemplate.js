import fs from 'fs'
import path from 'path'
import h from './vhtml.js'

function inComponents(moduleInfo) {
  return (
    moduleInfo.id.includes('src/components')
    && moduleInfo.hasDefaultExport
  )
}

function inPages(moduleInfo) {
  return (
    moduleInfo.id.includes('src/pages')
    && moduleInfo.hasDefaultExport
  )
}

/** Determines if a node is a component */ 
function isComponent(node) {
  return (
    (node.type === 'ExportDefaultDeclaration')
    // || node.type === 'VariableDeclaration'
    // || node.type === 'FunctionDeclaration'
  )
}

const filter = (nodes, lookup) => {
  const filtered = nodes.filter(lookup)
  if (filtered.length === 1) {
    return filtered[0]
  }
} 

const getAttr = (node, attr) => {
  if (Object.hasOwn(node, attr)) {
    return node[attr]
  }
}

const action = (node, lookup) => {
  if (typeof lookup === 'function') {
    return filter(node, lookup)
  } else {
    return getAttr(node, lookup)
  }
}

const graph = {
  'ExportDefaultDeclaration': ['declaration'],
  'ArrowFunctionExpression': ['body'],
  'FunctionDeclaration': ['body', 'body', (node) => node.type === 'ReturnStatement'],
  'ObjectExpression': ['properties', (node) => node.key.name === 'render', 'value'],
  'FunctionExpression': ['body', 'body', (node) => node.type === 'ReturnStatement'],
  'ReturnStatement': ['argument'],
}

function walk(node) {
  const path = graph[node.type]
  if (!path) return node
  for (let lookup of path) {
    node = action(node, lookup)
  }
  return walk(node)
}

function evenBrackets(str) {
  const brackets = [];
  const braces = [];
  let trimAt;
  let i = 0;
  for (let ch of str) {
    if (ch === '(') {
      brackets.push(ch)
    }

    if (ch === ')') {
      if (brackets.length > 0) {
        brackets.pop();
      } else {
        trimAt = i;
        break
      }
    }

    if (ch === '{') {
      braces.push(ch)
    }

    if (ch === '}') {
      if (brackets.length > 0) {
        braces.pop();
      } else {
        trimAt = i;
        break
      }
    }
    i++;
  }
  return str.substr(0, trimAt)
}

function getHyperscript(node, code) {
  if (isComponent(node)) {
    const targetNode = walk(node)
    const { start, end } = targetNode
    return evenBrackets(code.substr(start, end))
  }
}

function transformHyperscript(hyperscript) {
  const code = `
    const ret = ${hyperscript};
    return ret;
  `;
  const fn = new Function('h', code)
  return fn(h)
}

function createPath(moduleId, templateDir) {
  const parts = moduleId.split('pages')
  const filepath = parts[parts.length - 1].replace('.js', '')
  return path.join(templateDir, filepath) + '.html'
}

function getVhtml(moduleInfo) {
  if (moduleInfo.id.includes('vhtml.js')) {
    return moduleInfo.code.replaceAll('export default ', '') 
  }
}

export default function(templateDir = '../django-vite/templates') {
  let vhtml;
  return {
    name: 'generate-template',
    moduleParsed(moduleInfo) {
      vhtml ||= getVhtml(moduleInfo)
      if (inComponents(moduleInfo) || inPages(moduleInfo)) {
        for (const node of moduleInfo.ast.body) {
          const code = getHyperscript(node, moduleInfo.code)
          if (code && inPages(moduleInfo)) {
            const html = transformHyperscript(code)
            const path = createPath(moduleInfo.id, templateDir)
            console.log(html)
          }
        }
      }
    },
  } 
} 
