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
  for (const component in data) {
    switch (component) {
      case "metadata":
        iterateMetadata(dom, data.metadata)
        break
      case "content":
        iterateContent(dom, data.content)
        break
    }
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
  sectionsDiv.className = "sections"
  dom.window.document.getElementsByTagName("body")[0].appendChild(sectionsDiv)
  for (const sectionsItem in sections) {
    let sectionName = sectionsItem
    let section = sections[sectionsItem]
    iterateSection(dom, sectionName, section)
  }
}

function iterateSection(dom: JSDOM, sectionName: string, section: any) {
  let sectionDiv = dom.window.document.createElement("div")
  sectionDiv.className = sectionName
  dom.window.document
    .getElementsByClassName("sections")[0]
    .appendChild(sectionDiv)
  if (section.items) {
    iterateItems(dom, sectionName, section.items)
  }
}

function iterateItems(dom: JSDOM, sectionName: string, items: Items) {
  let itemsDiv = dom.window.document.createElement("div")
  itemsDiv.className = `${sectionName}-items`
  dom.window.document
    .getElementsByClassName(sectionName)[0]
    .appendChild(itemsDiv)
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
  console.log(sectionName)

  let itemDiv = dom.window.document.createElement("div")
  itemDiv.className = `${sectionName}-${itemName}`
  dom.window.document
    .getElementsByClassName(sectionName)[0]
    .appendChild(itemDiv)
  if (item.label) {
    createLabel(dom, `${sectionName}-${itemName}`, item.label)
  }
  if (item.link) {
    createLink(dom, `${sectionName}-${itemName}`, item.link)
  }
  if (item["horizontal-components"]) {
    iterateComponents(
      dom,
      item["horizontal-components"],
      `${sectionName}-${itemName}`,
      "horizontal-components"
    )
  }
  if (item["vertical-components"]) {
    iterateComponents(
      dom,
      item["vertical-components"],
      `${sectionName}-${itemName}`,
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
  componentsDiv.className = `${parentName}-${orientation}`
  dom.window.document
    .getElementsByClassName(parentName)[0]
    .appendChild(componentsDiv)
  for (const componentItem in components) {
    const component = components[componentItem]
    iterateItem(dom, `${parentName}-${orientation}`, componentItem, component)
  }
}

function createLabel(dom: JSDOM, parentName: string, label: any) {
  if (label) {
    let appLabel = dom.window.document.createElement("p")
    appLabel.innerHTML = label
    dom.window.document
      .getElementsByClassName(parentName)[0]
      .appendChild(appLabel)
  }
}

function createLink(dom: JSDOM, parentName: string, link: any) {
  if (link) {
    let appLink = dom.window.document.createElement("a")
    appLink.href = link.url
    appLink.setAttribute("alt", link.alt)
    appLink.innerHTML = link.text
    dom.window.document
      .getElementsByClassName(parentName)[0]
      .appendChild(appLink)
  }
}
