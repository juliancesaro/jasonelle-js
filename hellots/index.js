"use strict";
exports.__esModule = true;
var fs = require("fs");
var foo = "<html><head></head><body><p>Hello World!</p></body></html>";
fs.writeFileSync("hellots/index.html", foo);
//console.log(data.$jason.body);
