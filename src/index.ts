import * as data from "./json/hello.json"
import * as schema from "./json/schema.json"
import { iterateJason } from "./modules/Translator"
import { iterateIR } from "./modules/Generator"
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
  let IR = iterateJason(data.$jason)

  let dom = iterateIR(IR)

  fs.writeFileSync("src/generated/IR.json", JSON.stringify(IR))
  fs.writeFileSync("src/generated/index.html", dom.serialize())
}
