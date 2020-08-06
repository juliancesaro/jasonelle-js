import * as data from "./json/hello.json"
import * as schema from "./json/schema.json"
import * as fs from "fs"
import { createHTML, getCss } from "./modules/Generator"
import { enumHTML } from "./modules/Translator"

var Validator = require("jsonschema").Validator
var v = new Validator()

// If JSON is valid, create HTML DOM.
if (v.validate(data.$jason, schema).errors.length > 0) {
  // Invalid JSON.
  console.log("JSON is invalid!")
  console.log(v.validate(data.$jason, schema))
} else {
  // Valid JSON.
  let head = ""
  let body = ""

  let HTML = enumHTML(data.$jason)

  let css = getCss()

  // Create HTML element and write it to new 'index.html' file.
  fs.writeFileSync(
    "src/generated/index.html",
    HTML.window.document.documentElement.outerHTML
  )
  fs.writeFileSync("src/generated/styles.css", css)
}
