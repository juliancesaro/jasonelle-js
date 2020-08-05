import { Jason } from "./components/Jason"
import { Head } from "./components/Head"
import { Title } from "./components/Title"
import { Body } from "./components/Body"
import { Sections } from "./components/Sections"
import { Section } from "./components/Section"
import { Components } from "./components/Components"
import { Items } from "./components/Items"
import { Item } from "./components/Item"

// Functions for constructing HTML DOM
export function setHTML(HTML: string, head: string, body: string) {
  return HTML.concat(HTML, `<html>${head}${body}</html>`)
}

export function setHead(head: string) {
  return `<head>${head}</head>`
}

export function setTitle(head: string, title: string) {
  return head.concat(head, `<title>${title}</title>`)
}

export function setBody(body: string) {
  return `<body>${body}</body>`
}

export function setLabel(body: string, item: Item) {
  if (item.href) {
    return body.concat(
      `<a href=${item.href.url} alt=${item.href.alt}>${item.text}</a>`
    )
  } else {
    return body.concat(`<p>${item.text}</p>`)
  }
}

// Functions for iterating through data
export function createHTML(
  head: string,
  body: string,
  data: Jason,
  HTML: string
) {
  for (const component in data) {
    switch (component) {
      case "head":
        head = createHead(head, data.head)
        break
      case "body":
        body = createBody(body, data.body)
        break
    }
  }
  return setHTML(HTML, head, body)
}

export function createHead(head: string, data: Head) {
  for (const headComponent in data) {
    switch (headComponent) {
      case "title": {
        head = createTitle(head, data.title)
        break
      }
    }
  }
  return setHead(head)
}

export function createTitle(head: string, title: Title) {
  if (title) {
    return setTitle(head, title.toString())
  } else {
    return ""
  }
}

export function createBody(body: string, data: Body) {
  for (const bodyComponent in data) {
    switch (bodyComponent) {
      case "sections": {
        body = createSections(body, data.sections)
      }
    }
  }
  return setBody(body)
}

export function createSections(body: string, sections: Sections) {
  for (let i = 0; i < sections.length; i++) {
    let section = sections[i]
    body = createSection(body, section)
  }
  return setBody(body)
}

export function createSection(body: string, section: Section) {
  for (const sectionItem in section) {
    switch (sectionItem) {
      case "items":
        body = createItems(body, section.items)
        break
    }
  }
  return setBody(body)
}

export function createItems(body: string, items: Items) {
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    if (item.components) {
      body = createComponents(body, item.components)
    } else {
      body = createItem(body, item)
    }
  }
  return setBody(body)
}

export function createComponents(body: string, components: Components) {
  for (let i = 0; i < components.length; i++) {
    let component = components[i]
    body = createItem(body, component)
  }
  return setBody(body)
}

export function createItem(body: string, item: Item) {
  switch (item.type) {
    case "label":
      body = createLabel(body, item)
  }
  return setBody(body)
}

export function createLabel(body: string, label: Item) {
  return setLabel(body, label)
}
