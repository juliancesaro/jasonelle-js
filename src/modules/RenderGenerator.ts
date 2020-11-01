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
  let script = "let head = document.getElementsByTagName('head')[0];"
  script += "let body = document.getElementsByTagName('body')[0];"

  script += 'renderStyle(head);'

  script += iterateMetadata(script, data.metadata)
  script += iterateContent(script, data.content)

  return script
}

function iterateMetadata(script: string, metadata: any) {
  let metadataScript = ''
  for (const component in metadata) {
    switch (component) {
      case 'title':
        metadataScript += `renderTitle(this, '${metadata.title}');`
        break
    }
  }
  return metadataScript
}

function iterateContent(script: string, content: any) {
  let contentScript = ''
  for (const bodyComponent in content) {
    switch (bodyComponent) {
      case 'header': {
        contentScript += iterateHeader(content.header)
        break
      }
      case 'sections': {
        contentScript += iterateSections(content.sections)
        break
      }
      case 'footer': {
        contentScript += iterateFooter(content.footer)
        break
      }
    }
  }
  return contentScript
}

function iterateHeader(header: any) {
  let headerScript = ''
  headerScript += `renderHeader(this, ${JSON.stringify(header)});`

  switch (typeof header['header-title']) {
    case 'string':
      headerScript += `renderHeaderTitle(this, ${header['header-title']});`
      break
    case 'object':
      headerScript += `renderAdvancedTitle(this, ${JSON.stringify(
        header['header-title']
      )});`
      break
  }
  return headerScript
}

function iterateSections(sections: any) {
  let sectionsScript = ''
  sectionsScript += 'renderSections(this);'
  for (const sectionsItem in sections) {
    let sectionName = sectionsItem
    let section = sections[sectionsItem]
    sectionsScript += iterateSection(sectionName, section)
  }
  return sectionsScript
}

function iterateSection(sectionName: string, section: any) {
  let sectionScript = ''
  sectionScript += `renderSection(this, '${sectionName}');`
  if (section[`${sectionName}-items`]) {
    sectionScript += iterateItems(sectionName, section[`${sectionName}-items`])
  }
  return sectionScript
}

function iterateItems(sectionName: string, items: Items) {
  let itemsScript = ''
  itemsScript += `renderItems(this, '${sectionName}');`
  for (const itemsItem in items) {
    let itemName = itemsItem
    let item = items[itemsItem]
    itemsScript += iterateItem(`${sectionName}-items`, itemName, item)
  }
  return itemsScript
}

function iterateItem(sectionName: string, itemName: string, item: any) {
  let itemScript = ''
  let className = ''
  if (item.class) {
    className = item.class
  }
  if (item.label) {
    itemScript += `renderLabel(this, '${sectionName}', '${itemName}', '${className}', ${JSON.stringify(
      item.label
    )});`
  }
  // item is sometimes a string which has a link function
  if (item.link && typeof item.link === 'object') {
    itemScript += `renderLink(this, '${sectionName}', '${itemName}', '${className}', ${JSON.stringify(
      item.link
    )});`
  }
  if (item.image) {
    itemScript += `renderImage(this, '${sectionName}', '${itemName}', '${className}', ${JSON.stringify(
      item.image
    )});`
  }
  if (item.button) {
    itemScript += `renderButton(this, '${sectionName}', '${itemName}', '${className}', '${JSON.stringify(
      item.button
    )}');`
  }
  if (item.textfield) {
    itemScript += `renderTextfield(this, '${sectionName}', '${itemName}', '${className}', '${JSON.stringify(
      item.textfield
    )}');`
  }
  if (item.textarea) {
    itemScript += `renderTextarea(this, '${sectionName}', '${itemName}', '${className}', '${JSON.stringify(
      item.textarea
    )}');`
  }
  if (item.slider) {
    itemScript += `renderSlider(this, '${sectionName}', '${itemName}', '${className}', '${JSON.stringify(
      item.slider
    )}');`
  }
  if (item.switch) {
    itemScript += `renderSwitch(this, '${sectionName}', '${itemName}', '${className}', '${JSON.stringify(
      item.switch
    )}');`
  }
  if (item.space) {
    itemScript += `renderSpace(this, '${sectionName}', '${itemName}', '${className}', '${JSON.stringify(
      item.space
    )}');`
  }
  if (item[`${itemName}-horizontal-components`]) {
    itemScript += iterateComponents(
      item[`${itemName}-horizontal-components`],
      sectionName,
      `${itemName}-horizontal-components`
    )
  }
  if (item[`${itemName}-vertical-components`]) {
    itemScript += iterateComponents(
      item[`${itemName}-vertical-components`],
      sectionName,
      `${itemName}-vertical-components`
    )
  }
  return itemScript
}

function iterateComponents(
  components: Components,
  parentName: string,
  id: string
) {
  let componentsScript = ''
  componentsScript += `renderComponents(this, ${JSON.stringify(
    components
  )}, '${parentName}', '${id}');`
  for (const componentItem in components) {
    const component = components[componentItem]
    componentsScript += iterateItem(id, componentItem, component)
  }
  return componentsScript
}

function iterateFooter(footer: any) {
  let footerScript = ''
  footerScript += `renderFooter(this, ${JSON.stringify(footer)});`
  if (footer['footer-tabs']) {
    footerScript += iterateFooterTabs(footer['footer-tabs'])
  }
  return footerScript
}

function iterateFooterTabs(footerTabs: any) {
  let footerTabsScript = ''
  for (const tab in footerTabs) {
    footerTabsScript += `renderFooterTabsItem(this, 'footer', '${tab}', ${JSON.stringify(
      footerTabs[tab]
    )});`
  }
  return footerTabsScript
}
