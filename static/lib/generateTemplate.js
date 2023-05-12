import fs from 'fs'
import path from 'path'
import h from './vhtml.js'

globalThis.h = h;

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

function walk(node, graph) {
  const path = graph[node.type]
  if (!path) return node
  for (let lookup of path) {
    node = action(node, lookup)
  }
  return walk(node, graph)
}


export function evenBrackets(str) {
  const pairs = {
    '{': '}',
    '(': ')'
  }
  const stack = [];
  let ret = '';

  for (let ch of str) {
    if (['}', '{', ')', '('].includes(ch)) {
      if (ch === '{' || ch === '(') {
        stack.push(ch)
      } else {
        if (stack.length === 0) break;
        stack.pop();
      }
    }
    ret += ch
  }

  // append missing
  if (stack.length !== 0) {
    for (let ch of stack) {
      ret += pairs[ch]
    }
  }
  return ret
}


const pageGraph = {
  'ExportDefaultDeclaration': ['declaration'],
  'ArrowFunctionExpression': ['body'],
  'FunctionDeclaration': ['body', 'body', (node) => node.type === 'ReturnStatement'],
  'ObjectExpression': ['properties', (node) => node.key.name === 'render', 'value'],
  'FunctionExpression': ['body', 'body', (node) => node.type === 'ReturnStatement'],
  'ReturnStatement': ['argument'],
}


function getFilenameFromPath(path) {
  const parts = path.split('/')
  return parts[parts.length - 1].split('.')[0]
}


function createPath(moduleId, templateDir) {
  const filename = getFilenameFromPath(moduleId)
  return path.join(templateDir, filename) + '.html'
}


const componentGraph = {
  'ExportDefaultDeclaration': ['declaration'],
  'ArrowFunctionExpression': ['body'],
  'FunctionDeclaration': ['body', 'body'],
}


function parseComponent(moduleInfo) {
  for (const node of moduleInfo.ast.body) {
    if (node.type === 'ExportDefaultDeclaration') {
      const targetNode = walk(node, componentGraph)
      const { start, end } = targetNode;
      const code = evenBrackets(moduleInfo.code.substr(start, end))
      return code.replace('export default ', '')
    }
  } 
}


function parsePage(moduleInfo) {
  for (const node of moduleInfo.ast.body) {
    if (node.type === 'ExportDefaultDeclaration') {
      const targetNode = walk(node, pageGraph);
      const { start, end } = targetNode;
      return evenBrackets(moduleInfo.code.substr(start, end))
    }
  }
}

function evaluateSource(chunk) {
  return (new Function(chunk))()
}


function finalizeResult(html, moduleId) {
  const filename = getFilenameFromPath(moduleId)
  return `{% extends 'base.html' %}{% block content %}<div x-data="${filename}({{ context }})">${html}</div>{% endblock %}`
}


export default function(outputDir = '../django-vite/templates') {
  let importedIds = [],
      pageId = '',
      chunk = null,
      parsed = false
  return {
    name: 'generate-template',
    moduleParsed(moduleInfo) {
      // pages are parsed before components unless components are imported into
      // the entry file (which shouldn't happen).
      if (inPages(moduleInfo)) {
        const source = parsePage(moduleInfo)
        chunk = `
        const ret = ${source}
        return ret
        `
        importedIds = moduleInfo.importedIds
        pageId = moduleInfo.id
      }
      if (inComponents(moduleInfo)) {
        if (importedIds.includes(moduleInfo.id)) {
          const source = parseComponent(moduleInfo)
          chunk = `
          ${source}
          ${chunk}
          `
          importedIds = importedIds.filter(id => id !== moduleInfo.id)
          if (importedIds.length === 0) parsed = true
        }
      }
      if (parsed) {
        const path = createPath(pageId, outputDir);
        let html = evaluateSource(chunk)
        html = finalizeResult(html, pageId)
        fs.writeFileSync(path, html);
      }
    },
  } 
} 
