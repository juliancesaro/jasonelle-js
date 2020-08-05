"use strict";
exports.__esModule = true;
var Sections_1 = require("./Sections");
function setBody(body) {
    return "<body>" + body + "</body>";
}
exports.setBody = setBody;
function createBody(body, data) {
    for (var bodyComponent in data) {
        switch (bodyComponent) {
            case "sections": {
                body = Sections_1.createSections(body, data.sections);
            }
        }
    }
    return setBody(body);
}
exports.createBody = createBody;
