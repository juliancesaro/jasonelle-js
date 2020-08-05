"use strict";
exports.__esModule = true;
function setTitle(head, title) {
    return head.concat(head, "<title>" + title + "</title>");
}
exports.setTitle = setTitle;
function createTitle(head, title) {
    if (title) {
        return setTitle(head, title.toString());
    }
    else {
        return "";
    }
}
exports.createTitle = createTitle;
