"use strict";
exports.__esModule = true;
var jsdom_1 = require("jsdom");
// Functions for iterating through data
function enumHTML(data) {
    var dom = new jsdom_1.JSDOM("<!DOCTYPE html>");
    for (var component in data) {
        switch (component) {
            case "head":
                enumHead(dom, dom.window.document.getElementsByTagName("head")[0], data.head);
                break;
        }
    }
    return dom;
}
exports.enumHTML = enumHTML;
function enumHead(dom, head, data) {
    for (var headComponent in data) {
        switch (headComponent) {
            case "title": {
                enumTitle(dom, head, data.title);
                break;
            }
        }
    }
}
function enumTitle(dom, head, title) {
    if (title) {
        var titleELem = dom.window.document.createElement("title");
        titleELem.innerHTML = title.toString();
        head.appendChild(titleELem);
    }
}
