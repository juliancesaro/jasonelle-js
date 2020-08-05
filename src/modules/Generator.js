"use strict";
exports.__esModule = true;
// Functions for constructing HTML DOM
function setHTML(HTML, head, body) {
    return HTML.concat(HTML, "<html>" + head + body + "</html>");
}
exports.setHTML = setHTML;
function setHead(head) {
    return "<head>" + head + "</head>";
}
exports.setHead = setHead;
function setTitle(head, title) {
    return head.concat(head, "<title>" + title + "</title>");
}
exports.setTitle = setTitle;
function setBody(body) {
    return "<body>" + body + "</body>";
}
exports.setBody = setBody;
function setLabel(body, item) {
    if (item.href) {
        return body.concat("<a href=" + item.href.url + " alt=" + item.href.alt + ">" + item.text + "</a>");
    }
    else {
        return body.concat("<p>" + item.text + "</p>");
    }
}
exports.setLabel = setLabel;
// Functions for iterating through data
function createHTML(head, body, data, HTML) {
    for (var component in data) {
        switch (component) {
            case "head":
                head = createHead(head, data.head);
                break;
            case "body":
                body = createBody(body, data.body);
                break;
        }
    }
    return setHTML(HTML, head, body);
}
exports.createHTML = createHTML;
function createHead(head, data) {
    for (var headComponent in data) {
        switch (headComponent) {
            case "title": {
                head = createTitle(head, data.title);
                break;
            }
        }
    }
    return setHead(head);
}
exports.createHead = createHead;
function createTitle(head, title) {
    if (title) {
        return setTitle(head, title.toString());
    }
    else {
        return "";
    }
}
exports.createTitle = createTitle;
function createBody(body, data) {
    for (var bodyComponent in data) {
        switch (bodyComponent) {
            case "sections": {
                body = createSections(body, data.sections);
            }
        }
    }
    return setBody(body);
}
exports.createBody = createBody;
function createSections(body, sections) {
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        body = createSection(body, section);
    }
    return setBody(body);
}
exports.createSections = createSections;
function createSection(body, section) {
    for (var sectionItem in section) {
        switch (sectionItem) {
            case "items":
                body = createItems(body, section.items);
                break;
        }
    }
    return setBody(body);
}
exports.createSection = createSection;
function createItems(body, items) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.components) {
            body = createComponents(body, item.components);
        }
        else {
            body = createItem(body, item);
        }
    }
    return setBody(body);
}
exports.createItems = createItems;
function createComponents(body, components) {
    for (var i = 0; i < components.length; i++) {
        var component = components[i];
        body = createItem(body, component);
    }
    return setBody(body);
}
exports.createComponents = createComponents;
function createItem(body, item) {
    switch (item.type) {
        case "label":
            body = createLabel(body, item);
    }
    return setBody(body);
}
exports.createItem = createItem;
function createLabel(body, label) {
    return setLabel(body, label);
}
exports.createLabel = createLabel;
