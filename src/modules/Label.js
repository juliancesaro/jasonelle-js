"use strict";
exports.__esModule = true;
function setLabel(body, item) {
    if (item.href) {
        return body.concat("<a href=" + item.href.url + " alt=" + item.href.alt + ">" + item.text + "</a>");
    }
    else {
        return body.concat("<p>" + item.text + "</p>");
    }
}
exports.setLabel = setLabel;
function createLabel(body, label) {
    return setLabel(body, label);
}
exports.createLabel = createLabel;
