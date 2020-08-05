"use strict";
exports.__esModule = true;
var Label_1 = require("./Label");
var Body_1 = require("./Body");
function createItem(body, item) {
    switch (item.type) {
        case "label":
            body = Label_1.createLabel(body, item);
    }
    return Body_1.setBody(body);
}
exports.createItem = createItem;
