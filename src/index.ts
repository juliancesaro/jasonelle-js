import * as data from "./json/hello.json"
import * as schema from "./json/schema.json"
import * as fs from "fs"

var Validator = require("jsonschema").Validator
var v = new Validator()

//Interfaces
interface Jason {
  head: Head
  body: Body
}

interface Head {
  title: Title
}

interface Title extends String {}

interface Body {
  sections: Sections
}

interface Sections extends Array<Section> {}

interface Section {
  items: Items
}

interface Items extends Array<Item> {}

interface Item {
  type?: string
  text?: Label
  href?: Link
  components?: Components
}

interface Label extends String {}

interface Link {
  url: string
  alt: string
}

//interface Style {}

interface Components extends Array<Component> {}

interface Component extends Item {}

/**
 * Functions for building HTML DOM.
 */
function setHTML(HTML: string, head: string, body: string) {
  return HTML.concat(HTML, `<html>${head}${body}</html>`)
}
// Head functions.
function setHead(head: string) {
  return `<head>${head}</head>`
}

function setTitle(head: string, title: string) {
  return head.concat(head, `<title>${title}</title>`)
}

// Body functions.
function setBody(body: string) {
  return `<body>${body}</body>`
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

/**
 * Functions for looping through data.
 */
function createHTML(head: string, body: string, data: Jason, HTML: string) {
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

// Head functions
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

// Body functions
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
  for (let i = 0; i < sections.length; i++) {
    let section = sections[i]
    body = createSection(body, section)
  }
  return setBody(body)
}

function createSection(body: string, section: Section) {
  for (const sectionItem in section) {
    switch (sectionItem) {
      case "items":
        body = createItems(body, section.items)
        break
    }
  }
  return setBody(body)
}

function createItems(body: string, items: Items) {
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

function createComponents(body: string, components: Components) {
  for (let i = 0; i < components.length; i++) {
    let component = components[i]
    body = createItem(body, component)
  }
  return setBody(body)
}

function createItem(body: string, item: Item) {
  switch (item.type) {
    case "label":
      body = createLabel(body, item)
  }
  return setBody(body)
}

function createLabel(body: string, label: Item) {
  return setLabel(body, label)
}

// If JSON is valid, create HTML DOM.
if (v.validate(data.$jason, schema).errors.length > 0) {
  // Invalid JSON.
  console.log("JSON is invalid!")
  console.log(v.validate(data.$jason, schema))
} else {
  // Valid JSON.
  let HTML = ""
  let head = ""
  let body = ""

  HTML = createHTML(
    head,
    body,
    { head: data.$jason.head, body: data.$jason.body },
    HTML
  )

  // Create HTML element and write it to new 'index.html' file.
  fs.writeFileSync("src/index.html", HTML)
}
