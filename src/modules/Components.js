"use strict";
exports.__esModule = true;
var Item_1 = require("./Item");
var Body_1 = require("./Body");
function createComponents(body, components) {
    for (var i = 0; i < components.length; i++) {
        var component = components[i];
        body = Item_1.createItem(body, component);
    }
    return Body_1.setBody(body);
}
exports.createComponents = createComponents;
