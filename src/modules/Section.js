"use strict";
exports.__esModule = true;
var Items_1 = require("./Items");
var Body_1 = require("./Body");
function createSection(body, section) {
    for (var sectionItem in section) {
        switch (sectionItem) {
            case "items":
                body = Items_1.createItems(body, section.items);
                break;
        }
    }
    return Body_1.setBody(body);
}
exports.createSection = createSection;
