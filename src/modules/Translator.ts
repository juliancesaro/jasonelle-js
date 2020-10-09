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
      case "sections":
        {
          application = iterateSections(application, body.sections)
        }
        break
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
    [`${sectionName}-items-${itemName}-wrapper`]: {},
  }

  switch (item.type) {
    case "label":
      if (item.href) {
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}-wrapper`
        ] = createLink(
          application.content.sections[`${sectionName}`][
            `${sectionName}-items`
          ][`${sectionName}-items-${itemName}-wrapper`],
          item
        )
      } else if (item.text) {
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}-wrapper`
        ] = createLabel(
          application.content.sections[`${sectionName}`][
            `${sectionName}-items`
          ][`${sectionName}-items-${itemName}-wrapper`],
          item.text
        )
      }
      break
    case "image":
      if (item.url) {
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}-wrapper`
        ] = createImage(
          application.content.sections[`${sectionName}`][
            `${sectionName}-items`
          ][`${sectionName}-items-${itemName}-wrapper`],
          item.url
        )
      }
      break
    case "button":
      application.content.sections[`${sectionName}`][`${sectionName}-items`][
        `${sectionName}-items-${itemName}-wrapper`
      ] = createButton(
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}-wrapper`
        ],
        item
      )
      break
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
      break
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
      break
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
    `${sectionName}-items-${itemName}-wrapper`
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
  } else if (orientation === "vertical") {
    application.style = {
      ...application.style,
      [`${sectionName}-items-${itemName}-${orientation}-components`]: {
        display: "flex",
        ["flex-direction"]: "column",
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
    `${sectionName}-items-${itemName}-wrapper`
  ][`${sectionName}-items-${itemName}-${componentsName}`] = {
    ...application.content.sections[`${sectionName}`][`${sectionName}-items`][
      `${sectionName}-items-${itemName}-wrapper`
    ][`${sectionName}-items-${itemName}-${componentsName}`],
    [`${sectionName}-items-${itemName}-${componentsName}-${componentName}-wrapper`]: {},
  }
  switch (component.type) {
    case "label":
      if (component.href) {
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}-wrapper`
        ][`${sectionName}-items-${itemName}-${componentsName}`][
          `${sectionName}-items-${itemName}-${componentsName}-${componentName}-wrapper`
        ] = createLink(
          application.content.sections[`${sectionName}`][
            `${sectionName}-items`
          ][`${sectionName}-items-${itemName}-wrapper`][
            `${sectionName}-items-${itemName}-${componentsName}`
          ][
            `${sectionName}-items-${itemName}-${componentsName}-${componentName}-wrapper`
          ],
          component
        )
      } else if (component.text) {
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}-wrapper`
        ][`${sectionName}-items-${itemName}-${componentsName}`][
          `${sectionName}-items-${itemName}-${componentsName}-${componentName}-wrapper`
        ] = createLabel(
          application.content.sections[`${sectionName}`][
            `${sectionName}-items`
          ][`${sectionName}-items-${itemName}-wrapper`][
            `${sectionName}-items-${itemName}-${componentsName}`
          ][
            `${sectionName}-items-${itemName}-${componentsName}-${componentName}-wrapper`
          ],
          component.text
        )
      }
      break
    case "image":
      if (component.url) {
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}-wrapper`
        ][`${sectionName}-items-${itemName}-${componentsName}`][
          `${sectionName}-items-${itemName}-${componentsName}-${componentName}-wrapper`
        ] = createImage(
          application.content.sections[`${sectionName}`][
            `${sectionName}-items`
          ][`${sectionName}-items-${itemName}-wrapper`][
            `${sectionName}-items-${itemName}-${componentsName}`
          ][
            `${sectionName}-items-${itemName}-${componentsName}-${componentName}-wrapper`
          ],
          component.url
        )
      }
      break
    case "button":
      application.content.sections[`${sectionName}`][`${sectionName}-items`][
        `${sectionName}-items-${itemName}-wrapper`
      ][`${sectionName}-items-${itemName}-${componentsName}`][
        `${sectionName}-items-${itemName}-${componentsName}-${componentName}-wrapper`
      ] = createButton(
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}-wrapper`
        ][`${sectionName}-items-${itemName}-${componentsName}`][
          `${sectionName}-items-${itemName}-${componentsName}-${componentName}-wrapper`
        ],
        component
      )
      break
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

function createButton(parent: any, button: Item) {
  let buttonData = {}

  if (button.text) {
    buttonData = {
      button: { text: button.text },
    }
  } else if (button.url) {
    buttonData = {
      button: { url: button.url },
    }
  }
  parent = { ...parent, ...buttonData }

  return parent
}
