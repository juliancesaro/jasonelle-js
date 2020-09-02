import * as data from "./json/hello.json"
import * as schema from "./json/schema.json"
import { iterateHTML } from "./modules/Translator"
import * as fs from "fs"

var Validator = require("jsonschema").Validator
var v = new Validator()

// If JSON is valid, create HTML DOM.
if (v.validate(data.$jason, schema).errors.length > 0) {
  // Invalid JSON.
  console.log("JSON is invalid!")
  console.log(v.validate(data.$jason, schema))
} else {
  // Valid JSON.
  let IR = iterateHTML(data.$jason)

  console.log(JSON.stringify(IR))
  fs.writeFileSync("src/generated/IR.json", JSON.stringify(IR))
}
