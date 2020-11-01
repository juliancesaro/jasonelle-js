import { JSDOM } from 'jsdom'
import { Title } from './components/Title'
import { Items } from './components/Items'
import { Item } from './components/Item'
import { Components } from './components/Components'
import { AdvancedTitle } from './components/header/AdvancedTitle'

/**
 * Iterates through each styles object in the IR and maps their styles to a string.
 * Checks various properties and corrects them to match CSS styles.
 * This string is returned.
 */
export function compileStyle(data: any) {
  let styleString = ''
  for (const styleObj in data.style) {
    if (data.style[styleObj].hasOwnProperty('placeholder_color')) {
      const styles = `color:${data.style[styleObj].placeholder_color}`
      styleString += `#${styleObj}::placeholder{${styles}}`
      delete data.style[styleObj].placeholder_color
    }
    if (data.style[styleObj].hasOwnProperty('size')) {
      data.style[styleObj]['font-size'] = data.style[styleObj]['size']
      delete data.style[styleObj]['size']
    }
    const styles = Object.entries(data.style[styleObj])
      .map(([k, v]) => `${correctStyles(k)}:${correctStyles(String(v))}`)
      .join(';')
    styleString += `#${styleObj}{${styles}}`
  }
  return styleString
}

function correctStyles(property: string) {
  if (!isNaN(Number(property))) {
    return `${property}px`
  } else if (property === 'corner_radius') {
    return 'border-radius'
  } else if (property === 'align') {
    return 'text-align'
  } else {
    return property
  }
}

/**
 * Function to create initial html which index.js will manipulate
 */
export function createHTML() {
  let dom = new JSDOM(`<!DOCTYPE html>`)

  let renderScriptLink = dom.window.document.createElement('script')
  renderScriptLink.src = '../modules/Render.js'
  dom.window.document
    .getElementsByTagName('body')[0]
    .appendChild(renderScriptLink)

  let scriptLink = dom.window.document.createElement('script')
  scriptLink.src = 'script.js'
  dom.window.document.getElementsByTagName('body')[0].appendChild(scriptLink)

  return dom
}

export function iterateIR(data: any) {
  let script = `renderApplication(this,${JSON.stringify(data)});`

  return script
}
