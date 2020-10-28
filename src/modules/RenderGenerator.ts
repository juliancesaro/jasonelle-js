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

  let scriptLink = dom.window.document.createElement('script')
  scriptLink.src = 'script.js'
  dom.window.document.getElementsByTagName('body')[0].appendChild(scriptLink)

  return dom
}

export function iterateIR(data: any) {
  let script = "let head = document.getElementsByTagName('head')[0];"
  script += "let body = document.getElementsByTagName('body')[0];"

  let createStyleScript = "let element = document.createElement('link');"
  createStyleScript += 'element.setAttribute("rel", "stylesheet");'
  createStyleScript += 'element.setAttribute("href", "styles.css");'
  createStyleScript += 'head.appendChild(element);'

  let createStyleFunction = `function renderStyle() { ${createStyleScript} }`

  script += createStyleFunction + 'renderStyle();'

  script += iterateMetadata(script, data.metadata)
  script += iterateContent(script, data.content)

  return script
}

function iterateMetadata(script: string, metadata: any) {
  let metadataScript = ''
  for (const component in metadata) {
    switch (component) {
      case 'title':
        metadataScript += createTitle(metadata.title)
        break
    }
  }
  return metadataScript + 'renderTitle();'
}

function createTitle(title: Title) {
  let createTitleScript = "let element = document.createElement('title');"
  createTitleScript += `element.innerHTML = '${title.toString()}';`
  createTitleScript += 'head.appendChild(element);'
  let createTitleFunction = `function renderTitle() { ${createTitleScript} }`
  return createTitleFunction
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
      //   case 'footer': {
      //     iterateFooter(dom, content.footer)
      //     break
      //   }
    }
  }
  return contentScript
}

function iterateHeader(header: any) {
  let headerScript = ''
  // Create function for creating header element
  // This could be in its own 'createHeader()' function
  let createHeaderScript = "let element = document.createElement('header');"
  createHeaderScript += "element.id = 'header';"
  createHeaderScript += 'body.appendChild(element);'
  let createHeaderFunction = `function renderHeader() { ${createHeaderScript} }`
  headerScript += createHeaderFunction
  headerScript += 'renderHeader();'

  switch (typeof header.title) {
    case 'string':
      headerScript += createHeaderTitle(header.title)
      headerScript += 'renderHeaderTitle();'
      break
    case 'object':
      headerScript += createAdvancedTitle(header.title)
      break
  }
  return headerScript
}

function createHeaderTitle(title: Title) {
  let createHeaderTitleScript = "let element = document.createElement('p');"
  createHeaderTitleScript += `appTitle.innerHTML = '${title.toString()}';`
  createHeaderTitleScript +=
    "document.getElementsByTagName('header')[0].appendChild(element);"
  let createHeaderTitleFunction = `function renderHeaderTitle() { ${createHeaderTitleScript} }`
  return createHeaderTitleFunction
}

function createAdvancedTitle(title: AdvancedTitle) {
  let createAdvancedTitleScript = ''
  if (title.url) {
    createAdvancedTitleScript += createImage()
    return (createAdvancedTitleScript += `renderImage('header', 'header-title', '${title.url}');`)
  } else {
    createAdvancedTitleScript += "let element = document.createElement('p');"
    createAdvancedTitleScript += `element.innerHTML = '${title.toString()};'`
    createAdvancedTitleScript +=
      "document.getElementsByTagName('header')[0].appendChild(element);"
    let createAdvancedTitleFunction = `function renderAdvancedTitle() { ${createAdvancedTitleScript} }`
    return createAdvancedTitleFunction
  }
}

function iterateSections(sections: any) {
  let sectionsScript = ''
  let createSectionsScript = "let element = document.createElement('div');"
  createSectionsScript += "element.id = 'sections';"
  createSectionsScript +=
    "document.getElementsByTagName('body')[0].appendChild(element);"
  let createSectionsFunction = `function renderSections() { ${createSectionsScript} }`
  sectionsScript += createSectionsFunction
  sectionsScript += 'renderSections();'
  for (const sectionsItem in sections) {
    let sectionName = sectionsItem
    let section = sections[sectionsItem]
    sectionsScript += iterateSection(sectionName, section)
  }
  return sectionsScript
}

function iterateSection(sectionName: string, section: any) {
  let sectionScript = ''
  let createSectionScript = "let element = document.createElement('div');"
  createSectionScript += `element.id = sectionName;`
  createSectionScript +=
    "document.getElementById('sections').appendChild(element);"
  let createSectionFunction = `function renderSection(sectionName) { ${createSectionScript} }`
  sectionScript += createSectionFunction
  sectionScript += `renderSection('${sectionName}');`
  if (section[`${sectionName}-items`]) {
    sectionScript += iterateItems(sectionName, section[`${sectionName}-items`])
  }
  return sectionScript
}

function iterateItems(sectionName: string, items: Items) {
  let itemsScript = ''
  let createItemsScript = "let element = document.createElement('div');"
  createItemsScript += 'element.id = `${sectionName}-items`;'
  createItemsScript += `document.getElementById(sectionName).appendChild(element);`
  let createItemsFunction = `function renderItems(sectionName) { ${createItemsScript} }`
  itemsScript += createItemsFunction
  itemsScript += `renderItems('${sectionName}');`
  for (const itemsItem in items) {
    let itemName = itemsItem
    let item = items[itemsItem]
    itemsScript += iterateItem(`${sectionName}-items`, itemName, item)
  }
  return itemsScript
}

function iterateItem(sectionName: string, itemName: string, item: any) {
  let itemScript = ''
  if (item.label) {
    itemScript += createLabel()
    itemScript += `renderLabel('${sectionName}', '${itemName}', "${item.label}");`
  }
  if (item.link) {
    itemScript += createLink()
    itemScript += `renderLink('${sectionName}', '${itemName}', {url: '${item.link.url}', alt: '${item.link.alt}', text: '${item.link.text}'});`
  }
  if (item.image) {
    itemScript += createImage()
    itemScript += `renderImage('${sectionName}', '${itemName}', '${item.image.url}');`
  }
  //   if (item.button) {
  //     itemScript += createButton()
  //     itemScript += `renderButton('${sectionName}', '${itemName}', '${item.button}');`
  //   }
  //   if (item.textfield) {
  //     createTextfield(dom, sectionName, itemName, item.textfield)
  //   }
  //   if (item.textarea) {
  //     createTextarea(dom, sectionName, itemName, item.textarea)
  //   }
  //   if (item.slider) {
  //     createSlider(dom, sectionName, itemName, item.slider)
  //   }
  //   if (item.switch) {
  //     createSwitch(dom, sectionName, itemName, item.switch)
  //   }
  //   if (item.space) {
  //     createSpace(dom, sectionName, itemName)
  //   }
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
  let createComponentsScript = "let element = document.createElement('div');"
  createComponentsScript += 'element.id = id;'
  createComponentsScript += `document.getElementById('${parentName}').appendChild(element);`
  let createComponentsFunction = `function renderComponents(parentName, id) { ${createComponentsScript} }`
  componentsScript += createComponentsFunction
  componentsScript += `renderComponents('${parentName}', '${id}');`
  for (const componentItem in components) {
    const component = components[componentItem]
    componentsScript += iterateItem(id, componentItem, component)
  }
  return componentsScript
}

// function iterateFooter(dom: JSDOM, footer: any) {
//   let footerElem = dom.window.document.createElement('footer')
//   footerElem.id = 'footer'
//   dom.window.document.getElementsByTagName('body')[0].appendChild(footerElem)

//   if (footer['footer-tabs']) {
//     iterateFooterTabs(dom, footer['footer-tabs'])
//   } else if (footer.input) {
//     // application.content.footer = createFooterInput(
//     //   application.content.footer,
//     //   footer.input
//     // )
//   }
// }

// function iterateFooterTabs(dom: JSDOM, footerTabs: any) {
//   for (const tab in footerTabs) {
//     createFooterTabsItem(dom, 'footer', tab, footerTabs[tab])
//   }
// }

// function createFooterTabsItem(
//   dom: JSDOM,
//   parentName: string,
//   id: string,
//   footerTabsItem: any
// ) {
//   let itemLabel = dom.window.document.createElement('a')
//   itemLabel.id = id
//   dom.window.document.getElementById(parentName)?.appendChild(itemLabel)
//   // if (footerTabsItem.badge) {
//   //   tabsItemData = { ...tabsItemData, badge: footerTabsItem.badge }
//   // }
//   if (footerTabsItem.image) {
//     createImage(dom, id, `${id}-icon`, footerTabsItem.image)
//   }
//   if (footerTabsItem.text) {
//     createLabel(dom, id, `${id}-text`, footerTabsItem.text)
//   }
//   if (footerTabsItem.url) {
//     itemLabel.href = footerTabsItem.url
//   }
//   if (footerTabsItem.href) {
//     itemLabel.href = footerTabsItem.href
//   }
// }

function createLabel() {
  let createLabelScript = "let element = document.createElement('p');"
  createLabelScript += `element.id = id;`
  createLabelScript += `element.innerHTML = label;`
  createLabelScript += `document.getElementById(parentName).appendChild(element);`
  let createLabelFunction = `function renderLabel(parentName, id, label) { ${createLabelScript} }`
  return createLabelFunction
}

function createLink() {
  let createLinkScript = "let element = document.createElement('a');"
  createLinkScript += `element.id = id;`
  createLinkScript += `element.href = link.url;`
  createLinkScript += "element.setAttribute('alt', link.alt);"
  createLinkScript += `element.innerHTML = link.text;`
  createLinkScript += `document.getElementById(parentName).appendChild(element);`
  let createLinkFunction = `function renderLink(parentName, id, link) { ${createLinkScript} }`
  return createLinkFunction
}

function createImage() {
  let createImageScript = "let element = document.createElement('img');"
  createImageScript += `element.id = id;`
  createImageScript += `element.src = url;`
  createImageScript += `document.getElementById(parentName).appendChild(element);`
  let createImageFunction = `function renderImage(parentName, id, url) { ${createImageScript} }`
  return createImageFunction
}

// function createButton(dom: JSDOM, parentName: string, id: string, button: any) {
//   let appButton = dom.window.document.createElement('button')
//   appButton.id = id
//   appButton.innerHTML = button.text
//   dom.window.document.getElementById(parentName)?.appendChild(appButton)
// }

// function createTextfield(
//   dom: JSDOM,
//   parentName: string,
//   id: string,
//   textfield: any
// ) {
//   let appTextfield = dom.window.document.createElement('input')
//   appTextfield.id = id
//   if (textfield.value) {
//     appTextfield.setAttribute('value', textfield.value)
//   }
//   if (textfield.placeholder) {
//     appTextfield.setAttribute('placeholder', textfield.placeholder)
//   }
//   if (textfield.keyboard) {
//     appTextfield.setAttribute('inputmode', textfield.keyboard)
//   }
//   if (textfield.focus) {
//     appTextfield.toggleAttribute('autofocus')
//   }

//   dom.window.document.getElementById(parentName)?.appendChild(appTextfield)
// }

// function createTextarea(
//   dom: JSDOM,
//   parentName: string,
//   id: string,
//   textarea: any
// ) {
//   let appTextarea = dom.window.document.createElement('textarea')
//   appTextarea.id = id
//   if (textarea.value) {
//     appTextarea.setAttribute('value', textarea.value)
//   }
//   if (textarea.placeholder) {
//     appTextarea.setAttribute('placeholder', textarea.placeholder)
//   }
//   if (textarea.keyboard) {
//     appTextarea.setAttribute('inputmode', textarea.keyboard)
//   }
//   if (textarea.focus) {
//     appTextarea.toggleAttribute('autofocus')
//   }

//   dom.window.document.getElementById(parentName)?.appendChild(appTextarea)
// }

// function createSlider(dom: JSDOM, parentName: string, id: string, slider: any) {
//   let appSlider = dom.window.document.createElement('input')
//   appSlider.setAttribute('type', 'range')
//   appSlider.id = id
//   if (slider.value) {
//     appSlider.setAttribute('value', slider.value)
//   } else {
//     appSlider.setAttribute('value', '50')
//   }

//   dom.window.document.getElementById(parentName)?.appendChild(appSlider)
// }

// function createSwitch(
//   dom: JSDOM,
//   parentName: string,
//   id: string,
//   switchItem: any
// ) {
//   let appSwitch = dom.window.document.createElement('input')
//   appSwitch.setAttribute('type', 'checkbox')
//   appSwitch.id = id
//   if (switchItem.value === 'true') {
//     appSwitch.toggleAttribute('checked')
//   }

//   dom.window.document.getElementById(parentName)?.appendChild(appSwitch)
// }

// function createSpace(dom: JSDOM, parentName: string, id: string) {
//   let appSpace = dom.window.document.createElement('div')
//   appSpace.id = id

//   dom.window.document.getElementById(parentName)?.appendChild(appSpace)
// }
