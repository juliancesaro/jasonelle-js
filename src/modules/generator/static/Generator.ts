import { JSDOM } from 'jsdom'
import { renderApplication } from './Render'

/**
 * Iterates through each styles object in the IR and maps their styles to a string.
 * Checks various properties and corrects them to match CSS styles.
 * This string is returned.
 */
export function compileStyle(data: any) {
  let styleString = ''
  for (const styleObj in data.style) {
    if (styleObj.includes('class-')) {
      if (data.style[styleObj].hasOwnProperty('placeholder_color')) {
        const styles = `color:${data.style[styleObj].placeholder_color}`
        styleString += `.${styleObj.replace(
          'class-',
          ''
        )}::placeholder{${styles}}`
        delete data.style[styleObj].placeholder_color
      }
      if (data.style[styleObj].hasOwnProperty('size')) {
        data.style[styleObj]['font-size'] = data.style[styleObj]['size']
        delete data.style[styleObj]['size']
      }
      const styles = Object.entries(data.style[styleObj])
        .map(([k, v]) => `${correctStyles(k)}:${correctStyles(String(v))}`)
        .join(';')
      styleString += `.${styleObj.replace('class-', '')}{${styles}}`
    } else {
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
 * Each function iterates through data object or property of the
 * data object and calls the appropriate render function.
 */
export function iterateIR(data: any) {
  let dom = new JSDOM(`<!DOCTYPE html>`)

  renderApplication(dom, data)

  return dom
}
