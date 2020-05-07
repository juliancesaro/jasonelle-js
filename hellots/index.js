"use strict";
exports.__esModule = true;
var data = require("./hello.json");
var fs = require("fs");
//import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
for (var component in data.$jason) {
    switch (component) {
        case "head": {
            console.log("head");
            break;
        }
        case "body": {
            break;
        }
        default: {
            console.log('default');
            break;
        }
    }
}
var p = "<p>" + JSON.stringify(data.$jason) + "</p>";
var title = "<title>Jasonelle app</title>";
var body = "<body>" + p + "</body>";
var head = "<head>" + title + "</head>";
var html = "<html>" + head + body + "</html>";
fs.writeFileSync("hellots/index.html", html);
