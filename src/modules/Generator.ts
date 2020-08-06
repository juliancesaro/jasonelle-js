import { Jason } from "./components/Jason"
import { Head } from "./components/Head"
import { Title } from "./components/Title"
import { Body } from "./components/Body"
import { Sections } from "./components/Sections"
import { Section } from "./components/Section"
import { Items } from "./components/Items"
import { Item } from "./components/Item"
import { Components } from "./components/Components"

let css = ""

export const getCss = () => {
  return css
}

const setStyle = (style: string) => {
  css = css.concat(style)
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

function createHead(head: string, data: Head) {
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

function createTitle(head: string, title: Title) {
  if (title) {
    return setTitle(head, title.toString())
  } else {
    return ""
  }
}

function createBody(body: string, data: Body) {
  for (const bodyComponent in data) {
    switch (bodyComponent) {
      case "sections": {
        body = createSections(body, data.sections)
      }
    }
  }
  return setBody(body)
}

function createSections(body: string, sections: Sections) {
  var sectionsWrapper = ""
  for (let i = 0; i < sections.length; i++) {
    let section = sections[i]
    sectionsWrapper = createSection(sectionsWrapper, section, i)
  }
  body = setSections(body, sectionsWrapper)
  return body
}

function createSection(body: string, section: Section, num: number) {
  var sectionWrapper = ""
  for (const sectionItem in section) {
    console.log(body)
    switch (sectionItem) {
      case "items":
        sectionWrapper = createItems(body, section.items)
        break
    }
  }
  body = setSection(body, sectionWrapper, num)
  return body
}

function createItems(body: string, items: Items) {
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    body = createItem(body, item)
  }
  return body
}

function createItem(body: string, item: Item) {
  switch (item.type) {
    case "label":
      body = createLabel(body, item)
    case "vertical":
      if (item.components) {
        body = createComponents(body, item.components, item.type)
      }
    case "horizontal":
      if (item.components) {
        body = createComponents(body, item.components, item.type)
      }
  }
  return body
}

function createComponents(
  body: string,
  components: Components,
  orientation: string
) {
  var componentsWrapper = ""
  for (let i = 0; i < components.length; i++) {
    let component = components[i]
    componentsWrapper = createItem(componentsWrapper, component)
  }
  body = setComponents(body, componentsWrapper, orientation)
  return body
}

function createLabel(body: string, label: Item) {
  return setLabel(body, label)
}

// Functions for constructing HTML DOM
function setHTML(HTML: string, head: string, body: string) {
  return HTML.concat(HTML, `<html>${head}${body}</html>`)
}

function setHead(head: string) {
  return `<head><link rel='stylesheet' href='./styles.css'>${head}</head>`
}

function setTitle(head: string, title: string) {
  return head.concat(head, `<title>${title}</title>`)
}

function setBody(body: string) {
  return `<body>${body}</body>`
}

function setSections(body: string, sections: string) {
  return body.concat(`<div class="sections">${sections}</div>`)
}

function setSection(body: string, section: string, num: number) {
  return body.concat(`<section class="section-${num}">${section}</section>`)
}

function setComponents(body: string, components: string, orientation: string) {
  if (orientation === "vertical") {
    if (!css.includes(".vertical")) {
      setStyle(".vertical{display: flex, flex-direction: column}")
    }
    return body.concat(`<div class="vertical">${components}</div>`)
  } else {
    if (!css.includes(".horizontal")) {
      setStyle(".horizontal{display: flex}")
    }
    return body.concat(`<div class="horizontal">${components}</div>`)
  }
}

function setLabel(body: string, item: Item) {
  if (item.href) {
    return body.concat(
      `<a href=${item.href.url} alt=${item.href.alt}>${item.text}</a>`
    )
  } else {
    return body.concat(`<p>${item.text}</p>`)
  }
}
