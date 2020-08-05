import * as data from "./json/hello.json"
import * as schema from "./json/schema.json"
import * as fs from "fs"
import { create } from "domain"

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

interface Title {
  title: string
}

interface Body {
  head: Head
  body: Body
}

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

function setLabel(body: string, label: string) {
  return body.concat(`<p>${label}</p>`)
}

/**
 * Functions for looping through data.
 */
function createHTML(head: string, body: string, data: any, HTML: string) {
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
function createHead(head: string, data: any) {
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

function createTitle(head: string, title: any) {
  if (title) {
    return setTitle(head, title)
  } else {
    return ""
  }
}

// Body functions
function createBody(body: string, data: any) {
  for (const bodyComponent in data) {
    switch (bodyComponent) {
      case "sections": {
        body = createSections(body, data.sections)
      }
    }
  }
  return setBody(body)
}

function createSections(body: string, data: any) {
  for (let i = 0; i < data.length; i++) {
    let section = data[i]
    body = createSection(body, section)
  }
  return setBody(body)
}

function createSection(body: string, data: any) {
  for (const sectionItem in data) {
    switch (sectionItem) {
      case "items":
        body = createItems(body, data.items)
        break
    }
  }
  return setBody(body)
}

function createItems(body: string, data: any) {
  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    switch (item.type) {
      case "label":
        body = createLabel(body, item.text)
    }
  }
  return setBody(body)
}

function createLabel(body: string, label: any) {
  if (label) {
    return setLabel(body, label.toString())
  } else {
    return ""
  }
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

  HTML = createHTML(head, body, data.$jason, HTML)

  // Create HTML element and write it to new 'index.html' file.
  fs.writeFileSync("src/index.html", HTML)
}
