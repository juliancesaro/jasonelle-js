"use strict";
exports.__esModule = true;
var css = "";
exports.getCss = function () {
    return css;
};
var setStyle = function (style) {
    css = css.concat(style);
};
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
function createTitle(head, title) {
    if (title) {
        return setTitle(head, title.toString());
    }
    else {
        return "";
    }
}
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
function createSections(body, sections) {
    var sectionsWrapper = "";
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        sectionsWrapper = createSection(sectionsWrapper, section, i);
    }
    body = setSections(body, sectionsWrapper);
    return body;
}
function createSection(body, section, num) {
    var sectionWrapper = "";
    for (var sectionItem in section) {
        console.log(body);
        switch (sectionItem) {
            case "items":
                sectionWrapper = createItems(body, section.items);
                break;
        }
    }
    body = setSection(body, sectionWrapper, num);
    return body;
}
function createItems(body, items) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        body = createItem(body, item);
    }
    return body;
}
function createItem(body, item) {
    switch (item.type) {
        case "label":
            body = createLabel(body, item);
        case "vertical":
            if (item.components) {
                body = createComponents(body, item.components, item.type);
            }
        case "horizontal":
            if (item.components) {
                body = createComponents(body, item.components, item.type);
            }
    }
    return body;
}
function createComponents(body, components, orientation) {
    var componentsWrapper = "";
    for (var i = 0; i < components.length; i++) {
        var component = components[i];
        componentsWrapper = createItem(componentsWrapper, component);
    }
    body = setComponents(body, componentsWrapper, orientation);
    return body;
}
function createLabel(body, label) {
    return setLabel(body, label);
}
// Functions for constructing HTML DOM
function setHTML(HTML, head, body) {
    return HTML.concat(HTML, "<html>" + head + body + "</html>");
}
function setHead(head) {
    return "<head><link rel='stylesheet' href='./styles.css'>" + head + "</head>";
}
function setTitle(head, title) {
    return head.concat(head, "<title>" + title + "</title>");
}
function setBody(body) {
    return "<body>" + body + "</body>";
}
function setSections(body, sections) {
    return body.concat("<div class=\"sections\">" + sections + "</div>");
}
function setSection(body, section, num) {
    return body.concat("<section class=\"section-" + num + "\">" + section + "</section>");
}
function setComponents(body, components, orientation) {
    if (orientation === "vertical") {
        if (!css.includes(".vertical")) {
            setStyle(".vertical{display: flex, flex-direction: column}");
        }
        return body.concat("<div class=\"vertical\">" + components + "</div>");
    }
    else {
        if (!css.includes(".horizontal")) {
            setStyle(".horizontal{display: flex}");
        }
        return body.concat("<div class=\"horizontal\">" + components + "</div>");
    }
}
function setLabel(body, item) {
    if (item.href) {
        return body.concat("<a href=" + item.href.url + " alt=" + item.href.alt + ">" + item.text + "</a>");
    }
    else {
        return body.concat("<p>" + item.text + "</p>");
    }
}
