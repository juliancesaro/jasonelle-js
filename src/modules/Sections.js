"use strict";
exports.__esModule = true;
var Section_1 = require("./Section");
var Body_1 = require("./Body");
function createSections(body, sections) {
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        body = Section_1.createSection(body, section);
    }
    return Body_1.setBody(body);
}
exports.createSections = createSections;
