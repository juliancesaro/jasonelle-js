export function renderApplication(dom: any, application: any) {
  renderStyle(dom)
  renderMetadata(dom, application.metadata)
  renderContent(dom, application.content)
}

function renderStyle(dom: any) {
  let styleLink = dom.window.document.createElement('link')
  styleLink.rel = 'stylesheet'
  styleLink.href = 'styles.css'
  dom.window.document.getElementsByTagName('head')[0].appendChild(styleLink)
}

function renderMetadata(dom: any, metadata: any) {
  for (const component in metadata) {
    switch (component) {
      case 'title':
        renderTitle(dom, metadata.title)
        break
    }
  }
}

function renderContent(dom: any, content: any) {
  for (const bodyComponent in content) {
    switch (bodyComponent) {
      case 'header': {
        renderHeader(dom, content.header)
        break
      }
      case 'sections': {
        renderSections(dom, content.sections)
        break
      }
      case 'footer': {
        renderFooter(dom, content.footer)
        break
      }
    }
  }
}

function renderTitle(dom: any, title: any) {
  let titleElem = dom.window.document.createElement('title')
  titleElem.innerHTML = title.toString()
  dom.window.document.getElementsByTagName('head')[0].appendChild(titleElem)
}

function renderHeader(dom: any, header: any) {
  let headerElem = dom.window.document.createElement('header')
  headerElem.id = 'header'
  if (header.class) {
    headerElem.className = header.class
  }
  dom.window.document.getElementsByTagName('body')[0].appendChild(headerElem)
  switch (typeof header['header-title']) {
    case 'string':
      renderHeaderTitle(dom, header['header-title'])
      break
    case 'object':
      renderAdvancedTitle(dom, header['header-title'])
      break
  }
}

function renderHeaderTitle(dom: any, title: any) {
  let titleElem = dom.window.document.createElement('p')
  titleElem.innerHTML = title.toString()
  dom.window.document.getElementsByTagName('header')[0].appendChild(titleElem)
}

function renderAdvancedTitle(dom: any, title: any) {
  if (title.url) {
    let className = ''
    if (title.class) {
      className = title.class
    }
    renderImage(dom, 'header', 'header-title', className, title)
  } else {
    let titleElem = dom.window.document.createElement('p')
    titleElem.innerHTML = title.toString()
    dom.window.document.getElementsByTagName('header')[0].appendChild(titleElem)
  }
}

function renderSections(dom: any, sections: any) {
  let sectionsElem = dom.window.document.createElement('div')
  sectionsElem.id = 'sections'
  dom.window.document.getElementsByTagName('body')[0].appendChild(sectionsElem)
  for (const sectionsItem in sections) {
    let sectionName = sectionsItem
    let section = sections[sectionsItem]
    renderSection(dom, sectionName, section)
  }
}

function renderSection(dom: any, sectionName: string, section: any) {
  let sectionElem = dom.window.document.createElement('div')
  sectionElem.id = sectionName
  dom.window.document.getElementById('sections').appendChild(sectionElem)
  if (section[`${sectionName}-items`]) {
    renderItems(dom, sectionName, section[`${sectionName}-items`])
  }
}

function renderItems(dom: any, sectionName: any, items: any) {
  let itemsElem = dom.window.document.createElement('div')
  itemsElem.id = `${sectionName}-items`
  dom.window.document.getElementById(sectionName).appendChild(itemsElem)
  for (const itemsItem in items) {
    let itemName = itemsItem
    let item = items[itemsItem]
    renderItem(dom, `${sectionName}-items`, itemName, item)
  }
}

function renderItem(
  dom: any,
  sectionName: string,
  itemName: string,
  item: any
) {
  let className = ''
  if (item.class) {
    className = item.class
  }
  if (item.label) {
    renderLabel(dom, sectionName, itemName, className, item.label)
  }
  // item is sometimes a string which has a link function
  if (item.link && typeof item.link === 'object') {
    renderLink(dom, sectionName, itemName, className, item.link)
  }
  if (item.image) {
    renderImage(dom, sectionName, itemName, className, item.image)
  }
  if (item.button) {
    renderButton(dom, sectionName, itemName, className, item.button)
  }
  if (item.textfield) {
    renderTextfield(dom, sectionName, itemName, className, item.textfield)
  }
  if (item.textarea) {
    renderTextarea(dom, sectionName, itemName, className, item.textarea)
  }
  if (item.slider) {
    renderSlider(dom, sectionName, itemName, className, item.slider)
  }
  if (item.switch) {
    renderSwitch(dom, sectionName, itemName, className, item.switch)
  }
  if (item.space) {
    renderSpace(dom, sectionName, itemName)
  }
  if (item[`${itemName}-horizontal-components`]) {
    renderComponents(
      dom,
      item[`${itemName}-horizontal-components`],
      sectionName,
      `${itemName}-horizontal-components`
    )
  }
  if (item[`${itemName}-vertical-components`]) {
    renderComponents(
      dom,
      item[`${itemName}-vertical-components`],
      sectionName,
      `${itemName}-vertical-components`
    )
  }
}

function renderComponents(dom: any, components: any, parentName: any, id: any) {
  let componentsElem = dom.window.document.createElement('div')
  componentsElem.id = id
  if (components.class) {
    componentsElem.className = components.class
  }
  dom.window.document.getElementById(parentName).appendChild(componentsElem)
  for (const componentItem in components) {
    const component = components[componentItem]
    renderItem(dom, id, componentItem, component)
  }
}

function renderLabel(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  label: any
) {
  let labelElem = dom.window.document.createElement('p')
  labelElem.id = id
  if (className) {
    labelElem.className = className
  }
  labelElem.innerHTML = label
  dom.window.document.getElementById(parentName).appendChild(labelElem)
}

function renderLink(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  link: any
) {
  let linkElem = dom.window.document.createElement('a')
  linkElem.id = id
  if (className) {
    linkElem.className = className
  }
  linkElem.href = link.url
  linkElem.setAttribute('alt', link.alt)
  linkElem.innerHTML = link.text
  dom.window.document.getElementById(parentName).appendChild(linkElem)
}

function renderImage(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  image: any
) {
  let imageElem = dom.window.document.createElement('img')
  imageElem.id = id
  if (className) {
    imageElem.className = className
  }
  imageElem.src = image.url
  dom.window.document.getElementById(parentName).appendChild(imageElem)
}

function renderButton(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  button: any
) {
  let buttonElem = dom.window.document.createElement('button')
  buttonElem.id = id
  if (className) {
    buttonElem.className = className
  }
  buttonElem.innerHTML = button.text
  dom.window.document.getElementById(parentName).appendChild(buttonElem)
}

function renderTextfield(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  textfield: any
) {
  let textfieldElem = dom.window.document.createElement('input')
  textfieldElem.id = id
  if (className) {
    textfieldElem.className = className
  }
  if (textfield.value) {
    textfieldElem.setAttribute('value', textfield.value)
  }
  if (textfield.placeholder) {
    textfieldElem.setAttribute('placeholder', textfield.placeholder)
  }
  if (textfield.keyboard) {
    textfieldElem.setAttribute('inputmode', textfield.keyboard)
  }
  if (textfield.focus) {
    textfieldElem.toggleAttribute('autofocus')
  }

  dom.window.document.getElementById(parentName).appendChild(textfieldElem)
}

function renderTextarea(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  textarea: any
) {
  let textareaElem = dom.window.document.createElement('textarea')
  textareaElem.id = id
  if (className) {
    textareaElem.className = className
  }
  if (textarea.value) {
    textareaElem.setAttribute('value', textarea.value)
  }
  if (textarea.placeholder) {
    textareaElem.setAttribute('placeholder', textarea.placeholder)
  }
  if (textarea.keyboard) {
    textareaElem.setAttribute('inputmode', textarea.keyboard)
  }
  if (textarea.focus) {
    textareaElem.toggleAttribute('autofocus')
  }

  dom.window.document.getElementById(parentName).appendChild(textareaElem)
}

function renderSlider(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  slider: any
) {
  let sliderElem = dom.window.document.createElement('input')
  sliderElem.setAttribute('type', 'range')
  sliderElem.id = id
  if (className) {
    sliderElem.className = className
  }
  if (slider.value) {
    sliderElem.setAttribute('value', slider.value)
  } else {
    sliderElem.setAttribute('value', '50')
  }

  dom.window.document.getElementById(parentName).appendChild(sliderElem)
}

function renderSwitch(
  dom: any,
  parentName: string,
  id: string,
  className: string,
  switchItem: any
) {
  let switchElem = dom.window.document.createElement('input')
  switchElem.setAttribute('type', 'checkbox')
  switchElem.id = id
  if (className) {
    switchElem.className = className
  }
  if (switchItem.value === 'true') {
    switchElem.toggleAttribute('checked')
  }

  dom.window.document.getElementById(parentName).appendChild(switchElem)
}

function renderSpace(dom: any, parentName: string, id: string) {
  let spaceElem = dom.window.document.createElement('div')
  spaceElem.id = id

  dom.window.document.getElementById(parentName).appendChild(spaceElem)
}

function renderFooter(dom: any, footer: any) {
  let footerElem = dom.window.document.createElement('footer')
  footerElem.id = 'footer'
  if (footer.class) {
    footerElem.className = footer.class
  }
  dom.window.document.getElementsByTagName('body')[0].appendChild(footerElem)
  if (footer['footer-tabs']) {
    renderFooterTabs(dom, footer['footer-tabs'])
  }
}

function renderFooterTabs(dom: any, footerTabs: any) {
  for (const tab in footerTabs) {
    renderFooterTabsItem(dom, 'footer', tab, footerTabs[tab])
  }
}

function renderFooterTabsItem(
  dom: any,
  parentName: string,
  id: string,
  footerTabsItem: any
) {
  let footerItemElem = dom.window.document.createElement('a')
  footerItemElem.id = id
  if (footerTabsItem.class) {
    footerItemElem.className = footerTabsItem.class
  }
  dom.window.document.getElementById(parentName).appendChild(footerItemElem)
  for (const footerItemComp in footerTabsItem) {
    let className = footerTabsItem[footerItemComp].class
      ? footerTabsItem[footerItemComp].class
      : ''
    if (footerTabsItem[footerItemComp].image) {
      renderImage(
        dom,
        id,
        footerItemComp,
        className,
        footerTabsItem[footerItemComp].image
      )
    }
    if (footerTabsItem[footerItemComp].text) {
      renderLabel(
        dom,
        id,
        footerItemComp,
        className,
        footerTabsItem[footerItemComp].text
      )
    }
    if (footerItemComp === 'url') {
      footerItemElem.href = footerTabsItem.url
    }
    if (footerItemComp === 'href') {
      footerItemElem.href = footerTabsItem.href
    }
  }
}
