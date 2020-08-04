"use strict";
exports.__esModule = true;
var data = require("./json/hello.json");
var schema = require("./json/schema.json");
var fs = require("fs");
var Validator = require("jsonschema").Validator;
var v = new Validator();
// Functions for building HTML DOM.
function setHTML(HTML, head, body) {
    return HTML.concat(HTML, "<html>" + head + body + "</html>");
}
// Head functions.
function setHead(head) {
    return "<head>" + head + "</head>";
}
function setTitle(head, title) {
    return head.concat(head, "<title>" + title + "</title>");
}
// Body functions.
function setBody(body) {
    return "<body>" + body + "</body>";
}
function setLabel(body, label) {
    return body.concat("<label>" + label + "</label>");
}
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
    for (var component in data.$jason) {
        switch (component) {
            case "head": {
                for (var headComponent in data.$jason.head) {
                    switch (headComponent) {
                        case "title": {
                            head = setTitle(head, data.$jason.head.title);
                            break;
                        }
                    }
                }
                head = setHead(head);
                break;
            }
            case "body": {
                for (var bodyComponent in data.$jason.body) {
                    switch (bodyComponent) {
                        case "sections": {
                            for (var i = 0; i < data.$jason.body.sections.length; i++) {
                                var section = data.$jason.body.sections[i];
                                for (var sectionItem in section) {
                                    switch (sectionItem) {
                                        case "items":
                                            for (var k = 0; k < section.items.length; k++) {
                                                var item = section.items[k];
                                                switch (item.type) {
                                                    case "label":
                                                        if (item.text) {
                                                            console.log(item.text.toString());
                                                            body = setLabel(body, item.text.toString());
                                                        }
                                                }
                                            }
                                            break;
                                    }
                                }
                            }
                            break;
                        }
                    }
                }
                body = setBody(body);
                break;
            }
        }
    }
    // Create HTML element and write it to new 'index.html' file.
    HTML = setHTML(HTML, head, body);
    fs.writeFileSync("src/index.html", HTML);
}
