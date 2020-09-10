import { JSDOM } from "jsdom"
import { Title } from "./components/Title"
import { Items } from "./components/Items"
import { Components } from "./components/Components"

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
export function iterateIR(data: any) {
  let dom = new JSDOM(`<!DOCTYPE html>`)

  iterateMetadata(dom, data.metadata)
  iterateContent(dom, data.content)

  for (const styleItem in data.style) {
    let style = ""
    for (const styleAttr in data.style[styleItem]) {
      style += `${styleAttr}: ${data.style[styleItem][styleAttr]};`
    }
    dom.window.document.getElementById(styleItem)?.setAttribute("style", style)
  }

  return dom
}

function iterateMetadata(dom: JSDOM, metadata: any) {
  for (const component in metadata) {
    switch (component) {
      case "title":
        createTitle(dom, metadata.title)
        break
    }
  }
}

function createTitle(dom: JSDOM, title: Title) {
  if (title) {
    let appTitle = dom.window.document.createElement("title")
    appTitle.innerHTML = title.toString()
    dom.window.document.getElementsByTagName("head")[0].appendChild(appTitle)
  }
}

function iterateContent(dom: JSDOM, content: any) {
  for (const bodyComponent in content) {
    switch (bodyComponent) {
      case "sections": {
        iterateSections(dom, content.sections)
      }
    }
  }
}

function iterateSections(dom: JSDOM, sections: any) {
  let sectionsDiv = dom.window.document.createElement("div")
  sectionsDiv.id = "sections"
  dom.window.document.getElementsByTagName("body")[0].appendChild(sectionsDiv)
  for (const sectionsItem in sections) {
    let sectionName = sectionsItem
    let section = sections[sectionsItem]
    iterateSection(dom, sectionName, section)
  }
}

function iterateSection(dom: JSDOM, sectionName: string, section: any) {
  let sectionDiv = dom.window.document.createElement("div")
  sectionDiv.id = sectionName
  dom.window.document.getElementById("sections")?.appendChild(sectionDiv)
  if (section[`${sectionName}-items`]) {
    iterateItems(dom, sectionName, section[`${sectionName}-items`])
  }
}

function iterateItems(dom: JSDOM, sectionName: string, items: Items) {
  let itemsDiv = dom.window.document.createElement("div")
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
  let itemDiv = dom.window.document.createElement("div")
  itemDiv.id = `${itemName}`
  dom.window.document.getElementById(sectionName)?.appendChild(itemDiv)
  if (item.label) {
    createLabel(dom, `${itemName}`, item.label)
  }
  if (item.link) {
    createLink(dom, `${itemName}`, item.link)
  }
  if (item[`${itemName}-horizontal-components`]) {
    iterateComponents(
      dom,
      item[`${itemName}-horizontal-components`],
      `${itemName}`,
      "horizontal-components"
    )
  }
  if (item[`${itemName}-vertical-components`]) {
    iterateComponents(
      dom,
      item[`${itemName}-vertical-components`],
      `${itemName}`,
      "vertical-components"
    )
  }
}

function iterateComponents(
  dom: JSDOM,
  components: Components,
  parentName: string,
  orientation: string
) {
  let componentsDiv = dom.window.document.createElement("div")
  componentsDiv.id = `${parentName}-${orientation}`
  dom.window.document.getElementById(parentName)?.appendChild(componentsDiv)
  for (const componentItem in components) {
    const component = components[componentItem]
    iterateItem(dom, `${parentName}-${orientation}`, componentItem, component)
  }
}

function createLabel(dom: JSDOM, parentName: string, label: any) {
  if (label) {
    let appLabel = dom.window.document.createElement("p")
    appLabel.innerHTML = label
    dom.window.document.getElementById(parentName)?.appendChild(appLabel)
  }
}

function createLink(dom: JSDOM, parentName: string, link: any) {
  if (link) {
    let appLink = dom.window.document.createElement("a")
    appLink.href = link.url
    appLink.setAttribute("alt", link.alt)
    appLink.innerHTML = link.text
    dom.window.document.getElementById(parentName)?.appendChild(appLink)
  }
}
