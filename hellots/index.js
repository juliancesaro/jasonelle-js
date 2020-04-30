"use strict";
exports.__esModule = true;
var data = require("./main.json");
var fs = require("fs");
for (var component in data.$jason) {
    console.log(component);
    if (component == "body") {
        for (var _i = 0, component_1 = component; _i < component_1.length; _i++) {
            var bodyComponent = component_1[_i];
            console.log(bodyComponent);
        }
    }
}
var p = "<p>" + JSON.stringify(data.$jason) + "</p>";
var title = "<title>Jasonelle app</title>";
var body = "<body>" + p + "</body>";
var head = "<head>" + title + "</head>";
var html = "<html>" + head + body + "</html>";
fs.writeFileSync("hellots/index.html", html);
