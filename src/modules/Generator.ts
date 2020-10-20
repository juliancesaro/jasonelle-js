import { JSDOM } from 'jsdom'
import { Title } from './components/Title'
import { Items } from './components/Items'
import { Item } from './components/Item'
import { Components } from './components/Components'
import { AdvancedTitle } from './components/AdvancedTitle'

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
    const styles = Object.entries(data.style[styleObj])
      .map(([k, v]) => `${correctStyles(k)}:${correctStyles(String(v))}`)
      .join(';')
    styleString += `#${styleObj}{${styles}}`
  }
  return styleString
}

/**
 * 'Iterate' functions:
 *      - Iterate through data object or property of the data object.
 *      - Add to the application object or property of the application object.
 *      - Return the resulting application object or property.
 *
 * 'Create' functions:
 *      - Add their second paramter as a property of their first parameter.
 *      - Return the resulting object.
 */

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
        createTitle(dom, metadata.title)
        break
    }
  }
}

function createTitle(dom: JSDOM, title: Title) {
  let appTitle = dom.window.document.createElement('title')
  appTitle.innerHTML = title.toString()
  dom.window.document.getElementsByTagName('head')[0].appendChild(appTitle)
}

function iterateContent(dom: JSDOM, content: any) {
  for (const bodyComponent in content) {
    switch (bodyComponent) {
      case 'sections': {
        iterateSections(dom, content.sections)
        break
      }
      case 'header': {
        iterateHeader(dom, content.header)
        break
      }
    }
  }
}

function iterateHeader(dom: JSDOM, header: any) {
  let headerElem = dom.window.document.createElement('header')
  headerElem.id = 'header'
  dom.window.document.getElementsByTagName('body')[0].appendChild(headerElem)
  switch (typeof header.title) {
    case 'string':
      createHeaderTitle(dom, header.title)
      break
    case 'object':
      createAdvancedTitle(dom, header.title)
      break
  }
}

function createHeaderTitle(dom: JSDOM, title: Title) {
  let appTitle = dom.window.document.createElement('p')
  appTitle.innerHTML = title.toString()
  dom.window.document.getElementsByTagName('header')[0].appendChild(appTitle)
}

function createAdvancedTitle(dom: JSDOM, title: AdvancedTitle) {
  if (title.url) {
    createImage(dom, 'header', 'header-title', title)
  } else {
    let appTitle = dom.window.document.createElement('p')
    appTitle.innerHTML = title.toString()
    dom.window.document.getElementsByTagName('header')[0].appendChild(appTitle)
  }
}

function iterateSections(dom: JSDOM, sections: any) {
  let sectionsDiv = dom.window.document.createElement('div')
  sectionsDiv.id = 'sections'
  dom.window.document.getElementsByTagName('body')[0].appendChild(sectionsDiv)
  for (const sectionsItem in sections) {
    let sectionName = sectionsItem
    let section = sections[sectionsItem]
    iterateSection(dom, sectionName, section)
  }
}

function iterateSection(dom: JSDOM, sectionName: string, section: any) {
  let sectionDiv = dom.window.document.createElement('div')
  sectionDiv.id = sectionName
  dom.window.document.getElementById('sections')?.appendChild(sectionDiv)
  if (section[`${sectionName}-items`]) {
    iterateItems(dom, sectionName, section[`${sectionName}-items`])
  }
}

function iterateItems(dom: JSDOM, sectionName: string, items: Items) {
  let itemsDiv = dom.window.document.createElement('div')
  itemsDiv.id = `${sectionName}-items`
  dom.window.document.getElementById(sectionName)?.appendChild(itemsDiv)
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
  if (item.label) {
    createLabel(dom, sectionName, itemName, item.label)
  }
  if (item.link) {
    createLink(dom, sectionName, itemName, item.link)
  }
  if (item.image) {
    createImage(dom, sectionName, itemName, item.image)
  }
  if (item.button) {
    createButton(dom, sectionName, itemName, item.button)
  }
  if (item.textfield) {
    createTextfield(dom, sectionName, itemName, item.textfield)
  }
  if (item.textarea) {
    createTextarea(dom, sectionName, itemName, item.textarea)
  }
  if (item.slider) {
    createSlider(dom, sectionName, itemName, item.slider)
  }
  if (item.switch) {
    createSwitch(dom, sectionName, itemName, item.switch)
  }
  if (item.space) {
    createSpace(dom, sectionName, itemName)
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
  components: Components,
  parentName: string,
  id: string
) {
  let componentsDiv = dom.window.document.createElement('div')
  componentsDiv.id = id
  dom.window.document.getElementById(parentName)?.appendChild(componentsDiv)
  for (const componentItem in components) {
    const component = components[componentItem]
    iterateItem(dom, id, componentItem, component)
  }
}

function createLabel(dom: JSDOM, parentName: string, id: string, label: any) {
  let appLabel = dom.window.document.createElement('p')
  appLabel.id = id
  appLabel.innerHTML = label
  dom.window.document.getElementById(parentName)?.appendChild(appLabel)
}

function createLink(dom: JSDOM, parentName: string, id: string, link: any) {
  let appLink = dom.window.document.createElement('a')
  appLink.id = id
  appLink.href = link.url
  appLink.setAttribute('alt', link.alt)
  appLink.innerHTML = link.text
  dom.window.document.getElementById(parentName)?.appendChild(appLink)
}

function createImage(dom: JSDOM, parentName: string, id: string, image: any) {
  let appImage = dom.window.document.createElement('img')
  appImage.id = id
  appImage.src = image.url
  dom.window.document.getElementById(parentName)?.appendChild(appImage)
}

function createButton(dom: JSDOM, parentName: string, id: string, button: any) {
  let appButton = dom.window.document.createElement('button')
  appButton.id = id
  appButton.innerHTML = button.text
  dom.window.document.getElementById(parentName)?.appendChild(appButton)
}

function createTextfield(
  dom: JSDOM,
  parentName: string,
  id: string,
  textfield: any
) {
  let appTextfield = dom.window.document.createElement('input')
  appTextfield.id = id
  if (textfield.value) {
    appTextfield.setAttribute('value', textfield.value)
  }
  if (textfield.placeholder) {
    appTextfield.setAttribute('placeholder', textfield.placeholder)
  }
  if (textfield.keyboard) {
    appTextfield.setAttribute('inputmode', textfield.keyboard)
  }
  if (textfield.focus) {
    appTextfield.toggleAttribute('autofocus')
  }

  dom.window.document.getElementById(parentName)?.appendChild(appTextfield)
}

function createTextarea(
  dom: JSDOM,
  parentName: string,
  id: string,
  textarea: any
) {
  let appTextarea = dom.window.document.createElement('textarea')
  appTextarea.id = id
  if (textarea.value) {
    appTextarea.setAttribute('value', textarea.value)
  }
  if (textarea.placeholder) {
    appTextarea.setAttribute('placeholder', textarea.placeholder)
  }
  if (textarea.keyboard) {
    appTextarea.setAttribute('inputmode', textarea.keyboard)
  }
  if (textarea.focus) {
    appTextarea.toggleAttribute('autofocus')
  }

  dom.window.document.getElementById(parentName)?.appendChild(appTextarea)
}

function createSlider(dom: JSDOM, parentName: string, id: string, slider: any) {
  let appSlider = dom.window.document.createElement('input')
  appSlider.setAttribute('type', 'range')
  appSlider.id = id
  if (slider.value) {
    appSlider.setAttribute('value', slider.value)
  } else {
    appSlider.setAttribute('value', '50')
  }

  dom.window.document.getElementById(parentName)?.appendChild(appSlider)
}

function createSwitch(
  dom: JSDOM,
  parentName: string,
  id: string,
  switchItem: any
) {
  let appSwitch = dom.window.document.createElement('input')
  appSwitch.setAttribute('type', 'checkbox')
  appSwitch.id = id
  if (switchItem.value === 'true') {
    appSwitch.toggleAttribute('checked')
  }

  dom.window.document.getElementById(parentName)?.appendChild(appSwitch)
}

function createSpace(dom: JSDOM, parentName: string, id: string) {
  let appSpace = dom.window.document.createElement('div')
  appSpace.id = id

  dom.window.document.getElementById(parentName)?.appendChild(appSpace)
}
