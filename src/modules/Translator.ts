import { JSDOM } from "jsdom"
import { Jason } from "./components/Jason"
import { Head } from "./components/Head"
import { Title } from "./components/Title"
import { Body } from "./components/Body"
import { Sections } from "./components/Sections"
import { Section } from "./components/Section"
import { Items } from "./components/Items"
import { Item } from "./components/Item"
import { Components } from "./components/Components"

// Functions for iterating through data
export function enumHTML(data: Jason) {
  const dom = new JSDOM(`<!DOCTYPE html>`)
  for (const component in data) {
    switch (component) {
      case "head":
        enumHead(
          dom,
          dom.window.document.getElementsByTagName("head")[0],
          data.head
        )
        break
      case "body":
        enumBody(
          dom,
          dom.window.document.getElementsByTagName("body")[0],
          data.body
        )
        break
    }
  }
  return dom
}

function enumHead(dom: JSDOM, head: HTMLHeadElement, data: Head) {
  for (const headComponent in data) {
    switch (headComponent) {
      case "title": {
        createTitle(dom, head, data.title)
        break
      }
    }
  }
}

function createTitle(dom: JSDOM, head: HTMLHeadElement, title: Title) {
  if (title) {
    const titleELem = dom.window.document.createElement("title")
    titleELem.innerHTML = title.toString()
    head.appendChild(titleELem)
  }
}

function enumBody(dom: JSDOM, body: HTMLBodyElement, data: Body) {
  for (const bodyComponent in data) {
    switch (bodyComponent) {
      case "sections": {
        enumSections(dom, body, data.sections)
      }
    }
  }
}

function enumSections(dom: JSDOM, body: HTMLBodyElement, sections: Sections) {
  for (let i = 0; i < sections.length; i++) {
    let section = sections[i]
    enumSection(dom, body, section)
  }
}

function enumSection(dom: JSDOM, body: HTMLBodyElement, section: Section) {
  for (const sectionItem in section) {
    switch (sectionItem) {
      case "items":
        enumItems(dom, body, section.items)
        break
    }
  }
}

function enumItems(dom: JSDOM, body: HTMLBodyElement, items: Items) {
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    enumItem(dom, body, item)
  }
}

function enumItem(dom: JSDOM, body: HTMLBodyElement, item: Item) {
  switch (item.type) {
    case "label":
      createLabel(dom, body, item)
    case "vertical":
      if (item.components) {
        enumComponents(dom, body, item.components)
      }
    case "horizontal":
      if (item.components) {
        enumComponents(dom, body, item.components)
      }
  }
}

function enumComponents(
  dom: JSDOM,
  body: HTMLBodyElement,
  components: Components
) {
  for (let i = 0; i < components.length; i++) {
    let component = components[i]
    enumItem(dom, body, component)
  }
  return body
}

function createLabel(dom: JSDOM, body: HTMLBodyElement, label: Item) {
  return setLabel(dom, body, label)
}

function setLabel(dom: JSDOM, body: HTMLBodyElement, item: Item) {
  if (item.href) {
    const linkELem = dom.window.document.createElement("a")
    if (item.text) {
      linkELem.innerHTML = item.text?.toString()
    }

    body.appendChild(linkELem)
  } else {
    const labelELem = dom.window.document.createElement("p")
    labelELem.innerHTML = item.toString()
    body.appendChild(labelELem)
  }
}
