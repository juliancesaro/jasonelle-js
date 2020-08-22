import { JSDOM } from "jsdom";
import { Jason } from "./components/Jason";
import { Head } from "./components/Head";
import { Title } from "./components/Title";
import { Body } from "./components/Body";
import { Sections } from "./components/Sections";
import { Section } from "./components/Section";
import { Items } from "./components/Items";
import { Item } from "./components/Item";
import { Components } from "./components/Components";

/**
 * 'Iterate' functions iterate through components of 'data'
 * parameter and call either iterate or iterate or create functions.
 * 'Create' functions add a property to the parameter object.
 */
export function iterateHTML(data: Jason) {
  let application = {};
  for (const component in data) {
    switch (component) {
      case "head":
        application = iterateHead(application, data.head);
        break;
      case "body":
        application = iterateBody(application, data.body);
        break;
    }
  }
  return application;
}

function iterateHead(application: any, data: Head) {
  let metadata = {};
  for (const component in data) {
    switch (component) {
      case "title":
        metadata = createTitle(metadata, data.title);
        break;
    }
  }
  application = { ...application, metadata: { ...metadata } };
  return application;
}

function createTitle(metadata: any, title: Title) {
  if (title) {
    let titleData = { title: title };
    metadata = { ...metadata, ...titleData };
  }
  return metadata;
}

function iterateBody(application: any, data: Body) {
  let content = {};
  for (const bodyComponent in data) {
    switch (bodyComponent) {
      case "sections": {
        content = iterateSections(content, data.sections);
      }
    }
  }
  application = { ...application, content: { ...content } };
  return application;
}

function iterateSections(content: any, sections: Sections) {
  let sectionsData = {};
  for (let i = 0; i < sections.length; i++) {
    let section = sections[i];
    sectionsData = iterateSection(sectionsData, section, i);
  }
  content = { ...content, sections: { ...sectionsData } };
  return content;
}

function iterateSection(sectionsData: any, section: Section, num: Number) {
  let sectionData = {};
  for (const sectionItem in section) {
    switch (sectionItem) {
      case "items":
        sectionData = iterateItems(sectionData, section.items);
        break;
    }
  }
  sectionsData = { ...sectionsData, [`section-${num}`]: { ...sectionData } };
  return sectionsData;
}

function iterateItems(sectionData: any, items: Items) {
  let itemsData = {};
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    itemsData = iterateItem(itemsData, item, i);
  }
  sectionData = { ...sectionData, items: { ...itemsData } };
  return sectionData;
}

function iterateItem(itemsData: any, item: Item, num: Number) {
  let itemData = {};
  switch (item.type) {
    case "label":
      itemData = createLabel(itemData, item);
    case "vertical":
      if (item.components) {
        itemData = iterateComponents(itemData, item.components, item.type);
      }
    case "horizontal":
      if (item.components) {
        itemData = iterateComponents(itemData, item.components, item.type);
      }
  }

  itemsData = { ...itemsData, [`item-${num}`]: { ...itemData } };
  return itemsData;
}

function iterateComponents(
  itemData: any,
  components: Components,
  orientation: String
) {
  let componentsData = {};
  for (let i = 0; i < components.length; i++) {
    let component = components[i];
    componentsData = iterateItem(componentsData, component, i);
  }
  itemData = {
    ...itemData,
    [`${orientation}-components`]: { ...componentsData },
  };
  return itemData;
}

function createLabel(itemData: any, label: Item) {
  if (label) {
    let labelData = { label: label.text };
    itemData = { ...itemData, ...labelData };
  }
  return itemData;
}

// function setLabel(dom: JSDOM, body: HTMLBodyElement, item: Item) {
//   if (item.href) {
//     const linkELem = dom.window.document.createElement("a")
//     if (item.text) {
//       linkELem.innerHTML = item.text?.toString()
//     }

//     body.appendChild(linkELem)
//   } else {
//     const labelELem = dom.window.document.createElement("p")
//     labelELem.innerHTML = item.toString()
//     body.appendChild(labelELem)
//   }
// }
