import { JSDOM } from 'jsdom'
import {
  renderTitle,
  renderHeader,
  renderHeaderTitle,
  renderAdvancedTitle,
  renderSections,
  renderSection,
  renderItems,
  renderComponents,
  renderLabel,
  renderLink,
  renderImage,
  renderButton,
  renderTextfield,
  renderTextarea,
  renderSlider,
  renderSwitch,
  renderSpace,
  renderFooter,
  renderFooterTabsItem,
} from './Render'

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

  let styleLink = dom.window.document.createElement('link')
  styleLink.rel = 'stylesheet'
  styleLink.href = 'styles.css'
  dom.window.document.getElementsByTagName('head')[0].appendChild(styleLink)

  iterateMetadata(dom, data.metadata)
  iterateContent(dom, data.content)

  return dom
}

function iterateMetadata(dom: JSDOM, metadata: any) {
  for (const component in metadata) {
    switch (component) {
      case 'title':
        renderTitle(dom, metadata.title)
        break
    }
  }
}

function iterateContent(dom: JSDOM, content: any) {
  for (const bodyComponent in content) {
    switch (bodyComponent) {
      case 'header': {
        iterateHeader(dom, content.header)
        break
      }
      case 'sections': {
        iterateSections(dom, content.sections)
        break
      }
      case 'footer': {
        iterateFooter(dom, content.footer)
        break
      }
    }
  }
}

function iterateHeader(dom: JSDOM, header: any) {
  renderHeader(dom, header)
  switch (typeof header['header-title']) {
    case 'string':
      renderHeaderTitle(dom, header['header-title'])
      break
    case 'object':
      renderAdvancedTitle(dom, header['header-title'])
      break
  }
}

function iterateSections(dom: JSDOM, sections: any) {
  renderSections(dom)
  for (const sectionsItem in sections) {
    let sectionName = sectionsItem
    let section = sections[sectionsItem]
    iterateSection(dom, sectionName, section)
  }
}

function iterateSection(dom: JSDOM, sectionName: string, section: any) {
  renderSection(dom, sectionName)
  if (section[`${sectionName}-items`]) {
    iterateItems(dom, sectionName, section[`${sectionName}-items`])
  }
}

function iterateItems(dom: JSDOM, sectionName: string, items: any) {
  renderItems(dom, sectionName)
  for (const itemsItem in items) {
    let itemName = itemsItem
    let item = items[itemsItem]
    iterateItem(dom, `${sectionName}-items`, itemName, item)
  }
}

function iterateItem(
  dom: JSDOM,
  sectionName: string,
  itemName: string,
  item: any
) {
  let className = ''
  if (item.class) {
    className = item.class
  }
  if (item.label) {
    renderLabel(dom, sectionName, itemName, className, item.label)
  }
  // item is sometimes a string which has a link function
  if (item.link && typeof item.link === 'object') {
    renderLink(dom, sectionName, itemName, className, item.link)
  }
  if (item.image) {
    renderImage(dom, sectionName, itemName, className, item.image)
  }
  if (item.button) {
    renderButton(dom, sectionName, itemName, className, item.button)
  }
  if (item.textfield) {
    renderTextfield(dom, sectionName, itemName, className, item.textfield)
  }
  if (item.textarea) {
    renderTextarea(dom, sectionName, itemName, className, item.textarea)
  }
  if (item.slider) {
    renderSlider(dom, sectionName, itemName, className, item.slider)
  }
  if (item.switch) {
    renderSwitch(dom, sectionName, itemName, className, item.switch)
  }
  if (item.space) {
    renderSpace(dom, sectionName, itemName)
  }
  if (item[`${itemName}-horizontal-components`]) {
    iterateComponents(
      dom,
      item[`${itemName}-horizontal-components`],
      sectionName,
      `${itemName}-horizontal-components`
    )
  }
  if (item[`${itemName}-vertical-components`]) {
    iterateComponents(
      dom,
      item[`${itemName}-vertical-components`],
      sectionName,
      `${itemName}-vertical-components`
    )
  }
}

function iterateComponents(
  dom: JSDOM,
  components: any,
  parentName: string,
  id: string
) {
  renderComponents(dom, components, parentName, id)
  for (const componentItem in components) {
    const component = components[componentItem]
    iterateItem(dom, id, componentItem, component)
  }
}

function iterateFooter(dom: JSDOM, footer: any) {
  renderFooter(dom, footer)
  if (footer['footer-tabs']) {
    iterateFooterTabs(dom, footer['footer-tabs'])
  }
}

function iterateFooterTabs(dom: JSDOM, footerTabs: any) {
  for (const tab in footerTabs) {
    renderFooterTabsItem(dom, footerTabs[tab], 'footer', tab)
  }
}
