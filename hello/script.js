//Node creation
var body = document.getElementById("add");

var header = document.createElement("header");
header.setAttribute("class", "body-header");

var sections_1 = document.createElement("div");
sections_1.setAttribute("class", "sections");
sections_1.setAttribute("id", "sections-1");

var items_1 = document.createElement("div");
items_1.setAttribute("class", "items");
items_1.setAttribute("id", "items-1");

var item_1_1 = document.createElement("div");
item_1_1.setAttribute("class", "item");
item_1_1.setAttribute("id", "item-1-1");

var components_1 = document.createElement("div");
components_1.setAttribute("class", "components");
components_1.setAttribute("id", "components-1");

var component_1_1 = document.createElement("p");
component_1_1.setAttribute("class", "component");
component_1_1.setAttribute("id", "component-1-1");

var component_1_2 = document.createElement("p");
component_1_2.setAttribute("class", "component");
component_1_2.setAttribute("id", "component-1-2");

var component_1_3 = document.createElement("p");
component_1_3.setAttribute("class", "component");
component_1_3.setAttribute("id", "component-1-3");

var item_1_2 = document.createElement("div");
item_1_2.setAttribute("class", "item");
item_1_2.setAttribute("id", "item-1-2");

var item_1_3 = document.createElement("div");
item_1_3.setAttribute("class", "item");
item_1_3.setAttribute("id", "item-1-3");

var item_1_4 = document.createElement("div");
item_1_4.setAttribute("class", "item");
item_1_4.setAttribute("id", "item-1-4");

var label_1 = document.createElement("a");
label_1.setAttribute("class", "label");
label_1.setAttribute("id", "label-1");
label_1.setAttribute(
  "href",
  "https://raw.githubusercontent.com/jasonelle/docs/develop/examples/jasonette/apps/jasonpedia/demo.json"
);

var label_2 = document.createElement("a");
label_2.setAttribute("class", "label");
label_2.setAttribute("id", "label-2");
label_2.setAttribute("href", "https://www.youtube.com/watch?v=hfevBAAfCMQ");

var label_3 = document.createElement("a");
label_3.setAttribute("class", "label");
label_3.setAttribute("id", "label-3");
label_3.setAttribute("href", "https://jasonelle.com/docs");

component_1_1.textContent = "It's ALIVE!";
component_1_2.textContent =
  "This is a demo app. You can make your own app by changing the url inside strings.xml";
component_1_3.textContent = "{ ˃̵̑ᴥ˂̵̑}";
var node = document.createTextNode("{ ˃̵̑ᴥ˂̵̑}");
label_1.textContent = "Check out Live DEMO";
label_2.textContent = "Watch the tutorial video";
label_3.textContent = "View documentation";

//Tree building
body.appendChild(header);

body.appendChild(sections_1);
sections_1.appendChild(items_1);
items_1.appendChild(item_1_1);
item_1_1.appendChild(components_1);

components_1.appendChild(component_1_1);
components_1.appendChild(component_1_2);
components_1.appendChild(component_1_3);

items_1.appendChild(item_1_2);
item_1_2.appendChild(label_1);

items_1.appendChild(item_1_3);
item_1_3.appendChild(label_2);

items_1.appendChild(item_1_4);
item_1_4.appendChild(label_3);

//Styling
body.style.backgroundColor = "#ffffff";
body.style.border = "none";

header.style.padding = "50";

components_1.style.padding = "30";
components_1.style.alignItems = "center";

component_1_1.style.textAlign = "center";
component_1_1.style.fontFamily = "'Courier', Courier, monospace";
component_1_1.style.fontWeight = "bold";
component_1_1.style.fontSize = "26";

component_1_2.style.textAlign = "center";
component_1_2.style.fontFamily = "'Courier', Courier, monospace";
component_1_2.style.padding = "30";
component_1_2.style.fontSize = "20";

component_1_3.style.textAlign = "center";
component_1_3.style.fontFamily =
  "'Helvetica Neue', Helvetica, Arial, sans-serif";
component_1_3.style.fontWeight = "bold";
component_1_3.style.fontSize = "50";

item_1_2.style.textAlign = "right";
item_1_2.style.padding = "10";
item_1_2.style.fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";
item_1_2.style.color = "#000000";
item_1_2.style.fontSize = "20";

item_1_3.style.textAlign = "right";
item_1_3.style.padding = "10";
item_1_3.style.fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";
item_1_3.style.color = "#000000";
item_1_3.style.fontSize = "20";

item_1_4.style.textAlign = "right";
item_1_4.style.padding = "10";
item_1_4.style.fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";
item_1_4.style.color = "#000000";
item_1_4.style.fontSize = "20";

var item = {
  type: "label",
  text: "It's Alive!",
};

var item2 = {
  type: "label",
  text: "Check out the live DEMO!",
  href:
    "https://raw.githubusercontent.com/jasonelle/docs/develop/examples/jasonette/apps/jasonpedia/demo.json",
};

function renderItems(items, target) {
  const el = document.createElement("div");
  for (const item of items) {
    const inner = document.createElement("div");
    //render each item
  }
}

function renderItem(item, target) {
  let element;
  if (item.type === "label") {
    element = document.createElement("label");
    element.textContent = item.text;
  } else if (item.type === "link") {
    element = document.createElement("label");
    element.textContent = item.text;
    element.setAttribute("href", item.href);
  }
  target.appendChild(element);
}

function renderSections(sections, target) {
  const el = document.createElement("div");
  for (const section of sections) {
    const inner = document.createElement("div");
    el.appendChild(inner);
  }
  target.appendChild(el);
}
