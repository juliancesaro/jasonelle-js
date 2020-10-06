import { Jason } from "./components/Jason"
import { Head } from "./components/Head"
import { Title } from "./components/Title"
import { Body } from "./components/Body"
import { Sections } from "./components/Sections"
import { Section } from "./components/Section"
import { Items } from "./components/Items"
import { Item } from "./components/Item"
import { Components } from "./components/Components"
import { Style } from "./components/Style"

/**
 * 'Iterate' functions:
 *      - Iterate through data object or property of the data object.
 *      - Add to the application object or property of the application object.
 *      - Return the resulting application object or property.
 *
 * 'Create' functions:
 *      - Add their second paramter as a property of their first parameter.
 *      - Return the resulting object.
 */
export function iterateJason(data: Jason) {
  let application = {}

  application = iterateHead(application, data.head)
  application = iterateBody(application, data.body)

  application = { ...application }

  return application
}

function iterateHead(application: any, head: Head) {
  application = { ...application, metadata: {} }
  for (const component in head) {
    switch (component) {
      case "title":
        application.metadata = createTitle(application.metadata, head.title)
        break
    }
  }
  return application
}

function createTitle(parent: any, title: Title) {
  if (title) {
    let titleData = { title: title }
    parent = {
      ...parent,
      ...titleData,
    }
  }
  return parent
}

function iterateBody(application: any, body: Body) {
  application = { ...application, content: {} }
  for (const bodyComponent in body) {
    switch (bodyComponent) {
      case "sections": {
        application = iterateSections(application, body.sections)
      }
    }
  }
  return application
}

function iterateSections(application: any, sections: Sections) {
  application.content = { ...application.content, sections: {} }
  for (let i = 0; i < sections.length; i++) {
    let section = sections[i]
    application = iterateSection(application, section, i)
  }
  return application
}

function iterateSection(
  application: any,
  section: Section,
  sectionNum: number
) {
  application.content.sections = {
    ...application.content.sections,
    [`section-${sectionNum}`]: {},
  }
  for (const sectionItem in section) {
    switch (sectionItem) {
      case "items":
        application = iterateItems(
          application,
          section.items,
          `section-${sectionNum}`
        )
        break
    }
  }

  return application
}

function iterateItems(application: any, items: Items, sectionName: string) {
  application.content.sections[`${sectionName}`] = {
    ...application.content.sections[`${sectionName}`],
    [`${sectionName}-items`]: {},
  }
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    application = iterateItem(application, item, sectionName, `item-${i}`)
  }
  return application
}

function iterateItem(
  application: any,
  item: Item,
  sectionName: string,
  itemName: string
) {
  application.content.sections[`${sectionName}`][`${sectionName}-items`] = {
    ...application.content.sections[`${sectionName}`][`${sectionName}-items`],
    [`${sectionName}-items-${itemName}`]: {},
  }
  switch (item.type) {
    case "label":
      if (item.href) {
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ] = createLink(
          application.content.sections[`${sectionName}`][
            `${sectionName}-items`
          ][`${sectionName}-items-${itemName}`],
          item
        )
      } else if (item.text) {
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ] = createLabel(
          application.content.sections[`${sectionName}`][
            `${sectionName}-items`
          ][`${sectionName}-items-${itemName}`],
          item.text
        )
      }
    case "image":
      if (item.url) {
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ] = createImage(
          application.content.sections[`${sectionName}`][
            `${sectionName}-items`
          ][`${sectionName}-items-${itemName}`],
          item.url
        )
      }
    // Component cases
    case "vertical":
      if (item.components) {
        application = iterateComponents(
          application,
          item.components,
          sectionName,
          itemName,
          item.type
        )
      }
    case "horizontal":
      if (item.components) {
        application = iterateComponents(
          application,
          item.components,
          sectionName,
          itemName,
          item.type
        )
      }
  }
  if (item.style) {
    application.style = {
      ...application.style,
      [`${sectionName}-items-${itemName}`]: item.style,
    }
  }
  return application
}

function iterateComponents(
  application: any,
  components: Components,
  sectionName: string,
  itemName: string,
  orientation: String
) {
  application.content.sections[`${sectionName}`][`${sectionName}-items`][
    `${sectionName}-items-${itemName}`
  ] = {
    ...application.content.sections[`${sectionName}`][`${sectionName}-items`][
      `${sectionName}-items-${itemName}`
    ],
    [`${sectionName}-items-${itemName}-${orientation}-components`]: {},
  }
  for (let i = 0; i < components.length; i++) {
    let component = components[i]
    application = iterateComponent(
      application,
      component,
      sectionName,
      itemName,
      `${orientation}-components`,
      `component-${i}`
    )
  }
  if (orientation === "horizontal") {
    application.style = {
      ...application.style,
      [`${sectionName}-items-${itemName}-${orientation}-components`]: {
        display: "flex",
      },
    }
  }
  return application
}

function iterateComponent(
  application: any,
  component: Item,
  sectionName: string,
  itemName: string,
  componentsName: string,
  componentName: string
) {
  application.content.sections[`${sectionName}`][`${sectionName}-items`][
    `${sectionName}-items-${itemName}`
  ][`${sectionName}-items-${itemName}-${componentsName}`] = {
    ...application.content.sections[`${sectionName}`][`${sectionName}-items`][
      `${sectionName}-items-${itemName}`
    ][`${sectionName}-items-${itemName}-${componentsName}`],
    [`${sectionName}-items-${itemName}-${componentsName}-${componentName}`]: {},
  }
  switch (component.type) {
    case "label":
      if (component.href) {
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ][`${sectionName}-items-${itemName}-${componentsName}`][
          `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
        ] = createLink(
          application.content.sections[`${sectionName}`][
            `${sectionName}-items`
          ][`${sectionName}-items-${itemName}`][
            `${sectionName}-items-${itemName}-${componentsName}`
          ][
            `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
          ],
          component
        )
      } else if (component.text) {
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ][`${sectionName}-items-${itemName}-${componentsName}`][
          `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
        ] = createLabel(
          application.content.sections[`${sectionName}`][
            `${sectionName}-items`
          ][`${sectionName}-items-${itemName}`][
            `${sectionName}-items-${itemName}-${componentsName}`
          ][
            `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
          ],
          component.text
        )
      }
    case "image":
      if (component.url) {
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ][`${sectionName}-items-${itemName}-${componentsName}`][
          `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
        ] = createImage(
          application.content.sections[`${sectionName}`][
            `${sectionName}-items`
          ][`${sectionName}-items-${itemName}`][
            `${sectionName}-items-${itemName}-${componentsName}`
          ][
            `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
          ],
          component.url
        )
      }
  }
  if (component.style) {
    application.style = {
      ...application.style,
      [`${sectionName}-items-${itemName}-${componentsName}-${componentName}`]: component.style,
    }
  }
  return application
}

function createLabel(parent: any, label: string) {
  let labelData = { label: label }
  parent = { ...parent, ...labelData }
  return parent
}

function createLink(parent: any, link: Item) {
  if (link.href) {
    let linkData = {
      link: { text: link.text, url: link.href.url, alt: link.href.alt },
    }
    parent = { ...parent, ...linkData }
  }
  return parent
}

function createImage(parent: any, image: string) {
  let imageData = {
    image: { url: image },
  }
  parent = { ...parent, ...imageData }

  return parent
}
