"use strict";
exports.__esModule = true;
var Head_1 = require("./Head");
var Body_1 = require("./Body");
function setHTML(HTML, head, body) {
    return HTML.concat(HTML, "<html>" + head + body + "</html>");
}
exports.setHTML = setHTML;
function createHTML(head, body, data, HTML) {
    for (var component in data) {
        switch (component) {
            case "head":
                head = Head_1.createHead(head, data.head);
                break;
            case "body":
                body = Body_1.createBody(body, data.body);
                break;
        }
    }
    return setHTML(HTML, head, body);
}
exports.createHTML = createHTML;
