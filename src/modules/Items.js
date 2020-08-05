"use strict";
exports.__esModule = true;
var Item_1 = require("./Item");
var Components_1 = require("./Components");
var Body_1 = require("./Body");
function createItems(body, items) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.components) {
            body = Components_1.createComponents(body, item.components);
        }
        else {
            body = Item_1.createItem(body, item);
        }
    }
    return Body_1.setBody(body);
}
exports.createItems = createItems;
