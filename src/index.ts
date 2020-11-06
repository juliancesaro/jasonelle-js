import * as schema from './json/schema.json'
import { iterateJason } from './modules/translator/Translator'
import { iterateIR, compileStyle } from './modules/generator/static/Generator'
import {
  iterateIR as render,
  createHTML,
} from './modules/generator/dynamic/RenderGenerator'
import { optimiseStyle } from './modules/optimiser/Optimiser'
import * as fs from 'fs'

var Validator = require('jsonschema').Validator
var v = new Validator()

/**
 * Function for importing file specified in args
 */
const importFile = async () => {
  const myData = await import(process.argv.slice(2)[1])
  return myData
}

importFile().then((data) => {
  // If JSON is valid, create HTML DOM.
  //if (v.validate(data.$jason, schema).errors.length > 0) {
  // Invalid JSON.
  // console.log('JSON is invalid!')
  //console.log(v.validate(data.$jason, schema))
  // } else {
  // Valid JSON.
  dynamicCompile(data)
  // }
})

/**
 * First way of creating application: through adding to JSDOM and
 * writing the serialized JSDOM to html file (static)
 */
function staticCompile(data: any) {
  let IR = iterateJason(data.$jason)

  optimiseStyle(IR)

  let dom = iterateIR(IR)

  let style = compileStyle(IR)

  fs.writeFileSync('src/generated/IR.json', JSON.stringify(IR))
  fs.writeFileSync('src/generated/index.html', dom.serialize())
  fs.writeFileSync('src/generated/styles.css', style)
}

/**
 * Second way of creating application: through creating js file which
 * adds to the html file DOM at run time (dynamic)
 */
function dynamicCompile(data: any) {
  let IR = iterateJason(data.$jason)

  //optimiseStyle(IR)

  let dom = createHTML()

  let js = render(IR)

  let style = compileStyle(IR)

  fs.writeFileSync('src/generated/IR.json', JSON.stringify(IR))
  fs.writeFileSync('src/generated/index.html', dom.serialize())
  fs.writeFileSync('src/generated/script.js', js)
  fs.writeFileSync('src/generated/styles.css', style)
}
