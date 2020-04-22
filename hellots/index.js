"use strict";
exports.__esModule = true;
var data = require("./hello.json");
var fs = require("fs");
var foo = "<html><head></head><body><p>" +
    JSON.stringify(data.$jason) +
    "</p></body></html>";
fs.writeFileSync("hellots/index.html", foo);
//console.log(data.$jason.body);
