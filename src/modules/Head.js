"use strict";
exports.__esModule = true;
var Title_1 = require("./Title");
function setHead(head) {
    return "<head>" + head + "</head>";
}
exports.setHead = setHead;
function createHead(head, data) {
    for (var headComponent in data) {
        switch (headComponent) {
            case "title": {
                head = Title_1.createTitle(head, data.title);
                break;
            }
        }
    }
    return setHead(head);
}
exports.createHead = createHead;
