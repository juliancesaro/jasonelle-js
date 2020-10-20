import { Jason } from './components/Jason'
import { Head } from './components/Head'
import { Title } from './components/Title'
import { Body } from './components/Body'
import { Sections } from './components/Sections'
import { Section } from './components/Section'
import { Items } from './components/Items'
import { Item } from './components/Item'
import { Components } from './components/Components'
import { Style } from './components/Style'

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
      case 'title':
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
      case 'sections':
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
      case 'items':
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
    case 'label':
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
      break
    case 'image':
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
      break
    case 'button':
      application.content.sections[`${sectionName}`][`${sectionName}-items`][
        `${sectionName}-items-${itemName}`
      ] = createButton(
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ],
        item
      )
      break
    case 'textfield':
      application.content.sections[`${sectionName}`][`${sectionName}-items`][
        `${sectionName}-items-${itemName}`
      ] = createTextfield(
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ],
        item
      )
      break
    case 'textarea':
      application.content.sections[`${sectionName}`][`${sectionName}-items`][
        `${sectionName}-items-${itemName}`
      ] = createTextarea(
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ],
        item
      )
      break
    case 'slider':
      application.content.sections[`${sectionName}`][`${sectionName}-items`][
        `${sectionName}-items-${itemName}`
      ] = createSlider(
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ],
        item
      )
      break
    case 'switch':
      application.content.sections[`${sectionName}`][`${sectionName}-items`][
        `${sectionName}-items-${itemName}`
      ] = createSwitch(
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ],
        item
      )
      break
    case 'space':
      application.content.sections[`${sectionName}`][`${sectionName}-items`][
        `${sectionName}-items-${itemName}`
      ] = createSpace(
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ],
        item
      )
      break
    // Component cases
    case 'vertical':
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
    case 'horizontal':
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
    // Check if the items are components, so the styles are added to the components list,
    // not the parent item which is discarded in generation
    if (item.type === 'vertical') {
      application.style = {
        ...application.style,
        [`${sectionName}-items-${itemName}-vertical-components`]: item.style,
      }
    } else if (item.type === 'horizontal') {
      application.style = {
        ...application.style,
        [`${sectionName}-items-${itemName}-horizontal-components`]: item.style,
      }
    } else {
      application.style = {
        ...application.style,
        [`${sectionName}-items-${itemName}`]: item.style,
      }
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
  if (orientation === 'horizontal') {
    application.style = {
      ...application.style,
      [`${sectionName}-items-${itemName}-${orientation}-components`]: {
        display: 'flex',
      },
    }
  } else if (orientation === 'vertical') {
    application.style = {
      ...application.style,
      [`${sectionName}-items-${itemName}-${orientation}-components`]: {
        display: 'flex',
        ['flex-direction']: 'column',
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
    case 'label':
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
      break
    case 'image':
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
      break
    case 'button':
      application.content.sections[`${sectionName}`][`${sectionName}-items`][
        `${sectionName}-items-${itemName}`
      ][`${sectionName}-items-${itemName}-${componentsName}`][
        `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
      ] = createButton(
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ][`${sectionName}-items-${itemName}-${componentsName}`][
          `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
        ],
        component
      )
      break
    case 'textfield':
      application.content.sections[`${sectionName}`][`${sectionName}-items`][
        `${sectionName}-items-${itemName}`
      ][`${sectionName}-items-${itemName}-${componentsName}`][
        `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
      ] = createTextfield(
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ][`${sectionName}-items-${itemName}-${componentsName}`][
          `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
        ],
        component
      )
      break
    case 'textarea':
      application.content.sections[`${sectionName}`][`${sectionName}-items`][
        `${sectionName}-items-${itemName}`
      ][`${sectionName}-items-${itemName}-${componentsName}`][
        `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
      ] = createTextarea(
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ][`${sectionName}-items-${itemName}-${componentsName}`][
          `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
        ],
        component
      )
      break
    case 'slider':
      application.content.sections[`${sectionName}`][`${sectionName}-items`][
        `${sectionName}-items-${itemName}`
      ][`${sectionName}-items-${itemName}-${componentsName}`][
        `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
      ] = createSlider(
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ][`${sectionName}-items-${itemName}-${componentsName}`][
          `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
        ],
        component
      )
      break
    case 'switch':
      application.content.sections[`${sectionName}`][`${sectionName}-items`][
        `${sectionName}-items-${itemName}`
      ][`${sectionName}-items-${itemName}-${componentsName}`][
        `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
      ] = createSwitch(
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ][`${sectionName}-items-${itemName}-${componentsName}`][
          `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
        ],
        component
      )
      break
    case 'space':
      application.content.sections[`${sectionName}`][`${sectionName}-items`][
        `${sectionName}-items-${itemName}`
      ][`${sectionName}-items-${itemName}-${componentsName}`][
        `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
      ] = createSpace(
        application.content.sections[`${sectionName}`][`${sectionName}-items`][
          `${sectionName}-items-${itemName}`
        ][`${sectionName}-items-${itemName}-${componentsName}`][
          `${sectionName}-items-${itemName}-${componentsName}-${componentName}`
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

function createTextfield(parent: any, textfield: Item) {
  let textfieldData = { textfield: {} }

  textfieldData = {
    textfield: { variable: textfield.name },
  }

  if (textfield.value) {
    textfieldData.textfield = {
      ...textfieldData.textfield,
      value: textfield.value,
    }
  }
  if (textfield.placeholder) {
    textfieldData.textfield = {
      ...textfieldData.textfield,
      placeholder: textfield.placeholder,
    }
  }
  if (textfield.keyboard) {
    textfieldData.textfield = {
      ...textfieldData.textfield,
      keyboard: textfield.keyboard,
    }
  }
  if (textfield.focus) {
    textfieldData.textfield = {
      ...textfieldData.textfield,
      focus: textfield.focus,
    }
  }

  parent = { ...parent, ...textfieldData }

  return parent
}

function createTextarea(parent: any, textarea: Item) {
  let textareaData = { textarea: {} }

  textareaData = {
    textarea: { variable: textarea.name },
  }

  if (textarea.value) {
    textareaData.textarea = {
      ...textareaData.textarea,
      value: textarea.value,
    }
  }
  if (textarea.placeholder) {
    textareaData.textarea = {
      ...textareaData.textarea,
      placeholder: textarea.placeholder,
    }
  }
  if (textarea.keyboard) {
    textareaData.textarea = {
      ...textareaData.textarea,
      keyboard: textarea.keyboard,
    }
  }
  if (textarea.focus) {
    textareaData.textarea = {
      ...textareaData.textarea,
      focus: textarea.focus,
    }
  }

  parent = { ...parent, ...textareaData }

  return parent
}

function createSlider(parent: any, slider: Item) {
  let sliderData = { slider: {} }

  sliderData = {
    slider: { variable: slider.name },
  }

  if (slider.value) {
    sliderData.slider = {
      ...sliderData.slider,
      value: slider.value,
    }
  }
  if (slider.action) {
    sliderData.slider = {
      ...sliderData.slider,
      action: slider.action,
    }
  }

  parent = { ...parent, ...sliderData }

  return parent
}

function createSwitch(parent: any, switchItem: Item) {
  let switchData = { switch: {} }

  switchData = {
    switch: { variable: switchItem.name },
  }

  if (switchItem.value) {
    switchData.switch = {
      ...switchData.switch,
      value: switchItem.value,
    }
  }
  if (switchItem.action) {
    switchData.switch = {
      ...switchData.switch,
      action: switchItem.action,
    }
  }

  parent = { ...parent, ...switchData }

  return parent
}

function createSpace(parent: any, space: Item) {
  let spaceData = { space }

  parent = { ...parent, ...spaceData }

  return parent
}
