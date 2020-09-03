import { Jason } from "./components/Jason"
import { Head } from "./components/Head"
import { Title } from "./components/Title"
import { Body } from "./components/Body"
import { Sections } from "./components/Sections"
import { Section } from "./components/Section"
import { Items } from "./components/Items"
import { Item } from "./components/Item"
import { Components } from "./components/Components"
import { Style } from "./components/Style"

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
export function iterateJason(data: Jason) {
  let application = {}
  for (const component in data) {
    switch (component) {
      case "head":
        application = iterateHead(application, data.head)
        break
      case "body":
        application = iterateBody(application, data.body)
        break
    }
  }
  return application
}

function iterateHead(application: any, head: Head) {
  let metadata = {}
  for (const component in head) {
    switch (component) {
      case "title":
        metadata = createTitle(metadata, head.title)
        break
    }
  }
  application = { ...application, metadata: { ...metadata } }
  return application
}

function createTitle(metadata: any, title: Title) {
  if (title) {
    let titleData = { title: title }
    metadata = { ...metadata, ...titleData }
  }
  return metadata
}

function iterateBody(application: any, body: Body) {
  let content = {}
  for (const bodyComponent in body) {
    switch (bodyComponent) {
      case "sections": {
        content = iterateSections(content, body.sections)
      }
    }
  }
  application = { ...application, content: { ...content } }
  return application
}

function iterateSections(content: any, sections: Sections) {
  let sectionsData = {}
  for (let i = 0; i < sections.length; i++) {
    let section = sections[i]
    sectionsData = iterateSection(sectionsData, section, i)
  }
  content = { ...content, sections: { ...sectionsData } }
  return content
}

function iterateSection(sectionsData: any, section: Section, num: Number) {
  let sectionData = {}
  for (const sectionItem in section) {
    switch (sectionItem) {
      case "items":
        sectionData = iterateItems(sectionData, section.items)
        break
    }
  }
  sectionsData = { ...sectionsData, [`section-${num}`]: { ...sectionData } }
  return sectionsData
}

function iterateItems(sectionData: any, items: Items) {
  let itemsData = {}
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    itemsData = iterateItem(itemsData, item, i)
  }
  sectionData = { ...sectionData, items: { ...itemsData } }
  return sectionData
}

function iterateItem(itemsData: any, item: Item, num: Number) {
  let itemData = {}
  switch (item.type) {
    case "label":
      if (item.href) {
        itemData = createLink(itemData, item)
      } else {
        itemData = createLabel(itemData, item)
      }
    case "vertical":
      if (item.components) {
        itemData = iterateComponents(itemData, item.components, item.type)
      }
    case "horizontal":
      if (item.components) {
        itemData = iterateComponents(itemData, item.components, item.type)
      }
  }
  itemsData = { ...itemsData, [`item-${num}`]: { ...itemData } }
  return itemsData
}

function iterateComponents(
  itemData: any,
  components: Components,
  orientation: String
) {
  let componentsData = {}
  for (let i = 0; i < components.length; i++) {
    let component = components[i]
    componentsData = iterateComponent(componentsData, component, i)
  }
  itemData = {
    ...itemData,
    [`${orientation}-components`]: { ...componentsData },
  }
  return itemData
}

function iterateComponent(componentsData: any, component: Item, num: Number) {
  let componentData = {}
  switch (component.type) {
    case "label":
      componentData = createLabel(componentData, component)
  }
  componentsData = {
    ...componentsData,
    [`component-${num}`]: { ...componentData },
  }
  return componentsData
}

function createLink(itemData: any, link: Item) {
  if (link) {
    let linkData = {
      link: { text: link.text, url: link.href?.url, alt: link.href?.alt },
    }
    itemData = { ...itemData, ...linkData }
  }
  return itemData
}

function createLabel(itemData: any, label: Item) {
  if (label) {
    let labelData = { label: label.text }
    itemData = { ...itemData, ...labelData }
  }
  return itemData
}

function addStyle(id: String, style: Style) {}
