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
