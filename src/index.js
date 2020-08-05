"use strict";
exports.__esModule = true;
var data = require("./json/hello.json");
var schema = require("./json/schema.json");
var fs = require("fs");
var Validator = require("jsonschema").Validator;
var v = new Validator();
/**
 * Functions for building HTML DOM.
 */
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
    return body.concat("<p>" + label + "</p>");
}
/**
 * Functions for looping through data.
 */
function createHTML(head, body, data, HTML) {
    for (var component in data) {
        switch (component) {
            case "head":
                head = createHead(head, data.head);
                break;
            case "body":
                body = createBody(body, data.body);
                break;
        }
    }
    return setHTML(HTML, head, body);
}
// Head functions
function createHead(head, data) {
    for (var headComponent in data) {
        switch (headComponent) {
            case "title": {
                head = createTitle(head, data.title);
                break;
            }
        }
    }
    return setHead(head);
}
function createTitle(head, title) {
    if (title) {
        return setTitle(head, title);
    }
    else {
        return "";
    }
}
// Body functions
function createBody(body, data) {
    for (var bodyComponent in data) {
        switch (bodyComponent) {
            case "sections": {
                body = createSections(body, data.sections);
            }
        }
    }
    return setBody(body);
}
function createSections(body, data) {
    for (var i = 0; i < data.length; i++) {
        var section = data[i];
        body = createSection(body, section);
    }
    return setBody(body);
}
function createSection(body, data) {
    for (var sectionItem in data) {
        switch (sectionItem) {
            case "items":
                body = createItems(body, data.items);
                break;
        }
    }
    return setBody(body);
}
function createItems(body, data) {
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        switch (item.type) {
            case "label":
                body = createLabel(body, item.text);
        }
    }
    return setBody(body);
}
function createLabel(body, label) {
    if (label) {
        return setLabel(body, label.toString());
    }
    else {
        return "";
    }
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
    HTML = createHTML(head, body, data.$jason, HTML);
    // Create HTML element and write it to new 'index.html' file.
    fs.writeFileSync("src/index.html", HTML);
}
