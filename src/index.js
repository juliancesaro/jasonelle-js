"use strict";
exports.__esModule = true;
var data = require("./json/hello.json");
var schema = require("./json/schema.json");
var fs = require("fs");
var Generator_1 = require("./modules/Generator");
var Validator = require("jsonschema").Validator;
var v = new Validator();
// If JSON is valid, create HTML DOM.
if (v.validate(data.$jason, schema).errors.length > 0) {
    // Invalid JSON.
    console.log("JSON is invalid!");
    console.log(v.validate(data.$jason, schema));
}
else {
    // Valid JSON.
    var HTML = "";
    var head = "";
    var body = "";
    HTML = Generator_1.createHTML(head, body, { head: data.$jason.head, body: data.$jason.body }, HTML);
    var css = Generator_1.getCss();
    // Create HTML element and write it to new 'index.html' file.
    fs.writeFileSync("src/generated/index.html", HTML);
    fs.writeFileSync("src/generated/styles.css", css);
}
