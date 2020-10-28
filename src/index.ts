import * as data from './json/hello.json'
import * as schema from './json/schema.json'
import { iterateJason } from './modules/Translator'
import { iterateIR, compileStyle } from './modules/Generator'
import { iterateIR as render, createHTML } from './modules/RenderGenerator'
import * as fs from 'fs'

var Validator = require('jsonschema').Validator
var v = new Validator()

// If JSON is valid, create HTML DOM.
if (v.validate(data.$jason, schema).errors.length > 0) {
  // Invalid JSON.
  console.log('JSON is invalid!')
  console.log(v.validate(data.$jason, schema))
} else {
  /**
   * First way of creating application: through creating dom and writing
   * to html (static)
   */
  // Valid JSON.
  // let IR = iterateJason(data.$jason)

  // let dom = iterateIR(IR)

  // let style = compileStyle(IR)

  // fs.writeFileSync('src/generated/IR.json', JSON.stringify(IR))
  // fs.writeFileSync('src/generated/index.html', dom.serialize())
  // fs.writeFileSync('src/generated/styles.css', style)

  /**
   * Second way of creating application: through creating js file and writing
   * to html (static)
   */

  let IR = iterateJason(data.$jason)

  let dom = createHTML()

  let js = render(IR)

  let style = compileStyle(IR)

  fs.writeFileSync('src/generated/IR.json', JSON.stringify(IR))
  fs.writeFileSync('src/generated/index.html', dom.serialize())
  fs.writeFileSync('src/generated/script.js', js)
  fs.writeFileSync('src/generated/styles.css', style)
}
