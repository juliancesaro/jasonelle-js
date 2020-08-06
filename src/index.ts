import * as data from "./json/hello.json"
import * as schema from "./json/schema.json"
import * as fs from "fs"
import { createHTML, getCss } from "./modules/Generator"

var Validator = require("jsonschema").Validator
var v = new Validator()

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

  let css = getCss()

  // Create HTML element and write it to new 'index.html' file.
  fs.writeFileSync("src/generated/index.html", HTML)
  fs.writeFileSync("src/generated/styles.css", css)
}
